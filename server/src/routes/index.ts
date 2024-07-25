import fs from 'fs';
import { Express } from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));
export default async (baseUrl: string, app: Express) => {
    const files = await fs.readdirSync(__dirname);
    for (const file of files) {
        if (!file.includes(".js")) {
            const path = join(__dirname, file, '/index.js')
            const moduleRouter = (await import(path)).default;
            app.use(`${baseUrl}/${file}`, moduleRouter)
        }

    }
    
}