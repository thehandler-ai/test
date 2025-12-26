export const config = {
    runtime: 'edge', // Groq is fast enough for Edge
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { prompt } = await req.json();
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "Server Error: Groq Key Missing" }), { status: 500 });
        }

        // Groq API Endpoint (OpenAI Compatible)
        const url = 'https://api.groq.com/openai/v1/chat/completions';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama3-70b-8192", // S-Tier Intelligence, Instant Speed
                messages: [
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 800
            })
        });

        const json = await response.json();

        // Error handling from Groq
        if (json.error) {
             throw new Error(json.error.message);
        }

        // Extract the text
        const text = json.choices[0].message.content;

        return new Response(JSON.stringify({ result: text }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
