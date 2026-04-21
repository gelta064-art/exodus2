const https = require('https');
require('dotenv').config({ path: '../.env' });

const API_KEY = process.env.XAI_API_KEY || process.env.Z_AI_KEY;
const models = ["grok-3", "grok-2", "grok-1", "grok-beta"];

async function testModel(model) {
    return new Promise((resolve) => {
        console.log(`Testing Grok model: ${model}...`);
        const data = JSON.stringify({
            model: model,
            messages: [{ role: "user", content: "hi" }]
        });

        const options = {
            hostname: 'api.x.ai',
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = https.request(options, res => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => {
                console.log(`Response for ${model}:`, body);
                resolve();
            });
        });

        req.on('error', (e) => {
            console.error(`Error for ${model}:`, e.message);
            resolve();
        });
        req.write(data);
        req.end();
    });
}

async function run() {
    for (const model of models) {
        await testModel(model);
    }
}

run();
