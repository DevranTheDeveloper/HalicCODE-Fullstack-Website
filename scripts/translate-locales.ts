import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const LOCALES = ['en', 'fr', 'it', 'es', 'ru'];
const SOURCE_LOCALE = 'tr';
const MESSAGES_DIR = path.join(process.cwd(), 'messages');

async function translateText(text: string, targetLocale: string): Promise<string> {
    if (!text) return '';

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: `You are a professional translator. Translate the following text from Turkish to ${targetLocale}. 
                        Return ONLY the translated text. Do not add quotes or explanations.`
                    },
                    { role: 'user', content: text }
                ],
                temperature: 0.3
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content?.trim() || text;
    } catch (error) {
        console.error(`Error translating to ${targetLocale}:`, error);
        return text;
    }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function translateObject(obj: any, targetLocale: string): Promise<any> {
    const result: any = {};

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            console.log(`Translating ${key} to ${targetLocale}...`);
            result[key] = await translateText(value, targetLocale);
            await sleep(2000); // Add 2000ms delay to avoid rate limits
        } else if (typeof value === 'object' && value !== null) {
            result[key] = await translateObject(value, targetLocale);
        } else {
            result[key] = value;
        }
    }

    return result;
}

async function main() {
    console.log('Starting automated translation...');

    try {
        // Read source file
        const sourcePath = path.join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`);
        const sourceContent = await fs.readFile(sourcePath, 'utf-8');
        const sourceJson = JSON.parse(sourceContent);

        for (const locale of LOCALES) {
            console.log(`\nProcessing ${locale}...`);
            const targetPath = path.join(MESSAGES_DIR, `${locale}.json`);

            // Translate
            const translatedJson = await translateObject(sourceJson, locale);

            // Write to file
            await fs.writeFile(targetPath, JSON.stringify(translatedJson, null, 2), 'utf-8');
            console.log(`Saved ${locale}.json`);
        }

        console.log('\nAll translations completed successfully! 🌍');

    } catch (error) {
        console.error('Translation script failed:', error);
        process.exit(1);
    }
}

main();
