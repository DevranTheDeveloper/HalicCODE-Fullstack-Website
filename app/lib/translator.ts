import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TranslationResult {
    [locale: string]: string;
}

export async function translateContent(text: string, targetLocales: string[] = ['en', 'fr', 'it', 'es', 'ru']): Promise<string> {
    if (!text || !text.trim()) {
        return '{}';
    }

    try {
        const systemPrompt = `You are a professional translator. Translate the following text into these languages: ${targetLocales.join(', ')}.
        
        Return ONLY a valid JSON object where keys are language codes (${targetLocales.join(', ')}) and values are the translations.
        Do not include any other text, markdown formatting, or explanations.
        Example format: { "en": "Hello", "fr": "Bonjour" }
        
        The source text is in Turkish.`;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: text }
                ],
                temperature: 0.3,
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            console.error('Translation API error:', await response.text());
            return '{}';
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        if (!content) {
            return '{}';
        }

        // Validate JSON
        try {
            JSON.parse(content);
            return content;
        } catch (e) {
            console.error('Invalid JSON from translation API:', content);
            return '{}';
        }

    } catch (error) {
        console.error('Translation error:', error);
        return '{}';
    }
}
