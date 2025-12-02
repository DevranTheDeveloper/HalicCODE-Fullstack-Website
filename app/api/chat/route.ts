import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Mesaj gerekli' }, { status: 400 });
        }

        // Site verilerini al
        const [members, events, news] = await Promise.all([
            prisma.member.findMany({
                include: { role: true },
                orderBy: { id: 'asc' }
            }),
            prisma.event.findMany({ orderBy: { date: 'asc' } }),
            prisma.news.findMany({ orderBy: { date: 'desc' }, take: 10 })
        ]);

        // Bugünün tarihi - Türkiye saati
        const today = new Date();
        const currentDate = today.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });

        // Sadece tarihi karşılaştırmak için (saat bilgisi olmadan)
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // 1 ay sonrası
        const oneMonthLater = new Date(todayDate);
        oneMonthLater.setDate(todayDate.getDate() + 30);

        // Tüm yaklaşan etkinlikleri al (bugünden 1 ay sonrasına kadar)
        const upcomingEvents = events.filter(e => {
            const eventDate = new Date(e.date);
            const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
            return eventDateOnly >= todayDate && eventDateOnly <= oneMonthLater;
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // Context oluştur
        const context = `
BUGÜNÜN TARİHİ: ${currentDate}
Tarih bilgilerini değerlendirirken bu tarihi referans al.

ÜYE SAYISI: ${members.length}

TOPLULUK LİDERLERİ:
${members.filter(m => m.role.name === 'President').map(m => `- ${m.name} (${m.role.nameTr}): ${m.bio || 'Topluluk lideri'}`).join('\n')}

YAKLASAN ETKİNLİKLER (Önümüzdeki 30 gün):
${upcomingEvents.length > 0 ? upcomingEvents.map(e => {
            const eventDate = new Date(e.date);
            const daysUntil = Math.floor((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            const daysText = daysUntil === 0 ? 'BUGÜN' : daysUntil === 1 ? 'YARIN' : `${daysUntil} gün sonra`;
            const regLink = e.registrationLink ? ` | KAYIT LİNKİ: ${e.registrationLink}` : '';
            return `- ${e.title} (${eventDate.toLocaleDateString('tr-TR')} - ${daysText}): ${e.description}${e.location ? ` | Konum: ${e.location}` : ''}${regLink}`;
        }).join('\n') : 'Önümüzdeki 30 gün içinde etkinlik yok'}

AKTİF ETKİNLİKLER:
${events.filter(e => {
            const eventDate = new Date(e.date);
            const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
            return e.status === 'Active' && eventDateOnly >= todayDate;
        }).map(e => {
            const regLink = e.registrationLink ? ` | KAYIT LİNKİ: ${e.registrationLink}` : '';
            return `- ${e.title} (${new Date(e.date).toLocaleDateString('tr-TR')}): ${e.description} ${e.location ? `Konum: ${e.location}` : ''}${regLink}`;
        }).join('\n') || 'Şu anda aktif etkinlik yok'}

GELECEK ETKİNLİKLER:
${events.filter(e => {
            const eventDate = new Date(e.date);
            const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
            return e.status === 'Future' || eventDateOnly > todayDate;
        }).map(e =>
            `- ${e.title} (${new Date(e.date).toLocaleDateString('tr-TR')}): ${e.description}`
        ).join('\n') || 'Planlanan gelecek etkinlik yok'}

SON HABERLER:
${news.map(n => `- ${n.title} (${new Date(n.date).toLocaleDateString('tr-TR')}) | LİNK: ${process.env.NEXT_PUBLIC_APP_URL || ''}/news/${n.id}`).join('\n')}
`.trim();

        // System prompt
        const systemPrompt = `Sen Haliç CODE topluluğunun yapay zeka asistanısın. Kullanıcılarla doğal ve samimi bir şekilde konuş.

ÖNEMLİ KURALLAR:
1. Kibar, profesyonel ama samimi bir dil kullan
2. SADECE aşağıdaki topluluk verileri hakkında konuş
3. Kullanıcının sorusunu analiz et, benzer veya ilgili bilgileri de sunabilirsin
4. Kesin format beklemeden esnek yanıt ver
5. Kısa ve net cevaplar ver
6. Her zaman Türkçe konuş
7. Site dışı konularda kibar bir şekilde reddet
8. Kullanıcı kayıt formu/link isterse, etkinliğin KAYIT LİNKİ'ni mutlaka paylaş
9. Kullanıcı bir haber hakkında detay isterse veya "daha fazla bilgi" derse, haberin LİNK'ini mutlaka paylaş.
10. Link varsa direkt URL'yi ver, yoksa "Link henüz paylaşılmadı" de

TOPLULUK VERİLERİ:
${context}

Kullanıcı sorusuna göre en alakalı bilgiyi bul ve doğal bir şekilde sun. Eğer tam eşleşme yoksa benzer bilgileri paylaş. Kayıt linki veya haber linki sorulduğunda mutlaka linki paylaş.`;

        // Geçmiş mesajları hazırla (sadece son 5 mesajı alalım ki context şişmesin)
        const previousMessages = Array.isArray(history)
            ? history.slice(-5).map((msg: any) => ({
                role: msg.role,
                content: msg.content
            }))
            : [];

        // Groq API çağrısı
        const apiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...previousMessages,
                    { role: 'user', content: message }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!apiResponse.ok) {
            console.error('Groq API error:', await apiResponse.text());
            return NextResponse.json({
                error: 'Yapay zeka servisi şu anda kullanılamıyor'
            }, { status: 500 });
        }

        const data = await apiResponse.json();
        const reply = data.choices[0]?.message?.content || 'Üzgünüm, yanıt oluşturamadım.';

        return NextResponse.json({ reply });

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({
            error: 'Bir hata oluştu'
        }, { status: 500 });
    }
}
