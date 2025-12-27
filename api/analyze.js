// This is the full content for api/analyze.js

export default async function handler(req) {
    // 1. We only accept POST requests
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
    }

    try {
        // 2. Extract the data from the frontend
        const { text, identity, archetype } = await req.json();
        const apiKey = process.env.GROQ_API_KEY;

        // 3. Check for the secret key
        if (!apiKey) {
            throw new Error("Server Configuration Error: GROQ_API_KEY is missing.");
        }

        // 4. Build the master prompt
        const systemPrompt = `
            You are 'The Handler', a Machiavellian social strategist.
            The User is identified as: "${identity}"
            The User's chosen Archetype for this reply is: "${archetype}"
            The User is asking for help with this text/situation: "${text}"

            YOUR TASK:
            Analyze the power dynamics and provide 3 distinct reply options to help "${identity}" WIN the interaction.

            OUTPUT FORMAT (Strict text, no markdown):
            POWER: [Score 0-100% for ${identity}]
            INTENT: [What the other person actually means]
            
            REPLY OPTIONS (Drafted for ${identity} to send):
            1. [Option A]
            2. [Option B]
            3. [Option C]
        `;

        // 5. Call the Groq API
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                // Using a stable, powerful model. This is less likely to be decommissioned.
                model: "llama3-8b-8192", 
                messages: [
                    { role: "user", content: systemPrompt }
                ],
                temperature: 0.7,
                max_tokens: 800
            })
        });

        const json = await response.json();

        if (json.error) {
             throw new Error(`Groq API Error: ${json.error.message}`);
        }

        const resultText = json.choices[0].message.content;

        // 6. Send the successful result back to the frontend
        return new Response(JSON.stringify({ result: resultText }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        // 7. If anything fails, send a clear error message
        console.error("Handler API Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
