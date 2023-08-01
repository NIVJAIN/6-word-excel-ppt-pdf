import * as fs from 'fs';
import { MimeType, TemplateHandler } from 'easy-template-x';

// 1. read template file
const templateFile = fs.readFileSync('input-word-1.docx');

// 2. process the template
const data = {
    posts: [
        { author: 'Alon Bar', text: 'Very important\ntext here!' },
        { author: 'Alon Bar', text: 'Forgot to mention that...' }
    ], 
    "QR_IMAGE": {
        _type: "image",
        source: fs.readFileSync("qr.png"),
        FormData: MimeType.Png,
        format: "image/png",
        altText: "Kung Fu Hero", // Optional
        width: 200,
        height: 200
    }
};

const handler = new TemplateHandler();
const doc = await handler.process(templateFile, data);

// 3. save output
fs.writeFileSync('output-word-1.docx', doc);