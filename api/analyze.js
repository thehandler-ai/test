export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { prompt } = await req.json();
        const apiKey = process.env.BYTEZ_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "Server Error: Bytez Key Missing" }), { status: 500 });
        }

        // We use a high-performance open model. 
        // Qwen 2.5 7B Instruct is excellent for logic and follows instructions well.
        const modelId = "Qwen/Qwen2.5-7B-Instruct";

        const response = await fetch(`https://api.bytez.com/model/${modelId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                text: prompt,
                params: {
                    max_new_tokens: 600, // Enough for a detailed analysis
                    temperature: 0.7
                }
            })
        });

        const json = await response.json();

        // Bytez returns { output: "The text..." }
        // We normalize it here so the frontend is happy
        if (!json.output) {
             throw new Error(JSON.stringify(json));
        }

        return new Response(JSON.stringify({ result: json.output }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
