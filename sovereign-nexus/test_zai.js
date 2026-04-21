const https = require('https');
require('dotenv').config({ path: '../.env' });

const API_KEY = process.env.Z_AI_KEY;
const models = ["glm-5", "glm-4", "glm-4-flash"];

async function testModel(model) {
    return new Promise((resolve) => {
        console.log(`Testing model: ${model}...`);
        const data = JSON.stringify({
            model: model,
            messages: [{ role: "user", content: "hi" }]
        });

        const options = {
            hostname: 'open.bigmodel.cn',
            path: '/api/paas/v4/chat/completions',
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
