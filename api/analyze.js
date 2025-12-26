export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        // Receive the raw data from Frontend
        const { text, identity, archetype } = await req.json();
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "Server Error: API Key Missing" }), { status: 500 });
        }

        // --- THE SECRET SAUCE (System Prompt) ---
        // This is where you define the AI's personality.
        // It is hidden from the user.
        const systemPrompt = `
        You are 'The Handler', a strategic social advisor.
        
        CONTEXT:
        - The User is identified as: "${identity}"
        - The User's chosen Archetype is: "${archetype}"
        - The User is asking for help with this text/situation:
        "${text}"

        GOAL:
        1. Analyze the power dynamics.
        2. Draft 3 specific text messages that "${identity}" should send next. 
        CRITICAL: You must write these messages AS "${identity}". Do NOT write what the other person should say. Even if "${identity}" sent the last message, draft a follow-up or a double-text strategy.

        ARCHETYPE GUIDELINES:
        - Ghost: Stoic, short, aloof, lower case.
        - Siren: Sweet, manipulative, victim-playing, emojis.
        - Sovereign: Cold, direct, dominant, absolute.
        - Yapper: Chaotic, high energy, enthusiastic.

        OUTPUT FORMAT (Strict, no markdown bolding):
        POWER: [Score 0-100% for ${identity}]
        INTENT: [What the other person actually means / The hidden subtext of the situation]
        
        REPLY OPTIONS (Drafted for ${identity} to send):
        1. [Option A]
        2. [Option B]
        3. [Option C]
        `;

        const url = 'https://api.groq.com/openai/v1/chat/completions';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "You are a helpful assistant." }, // Groq sometimes needs a system msg
                    { role: "user", content: systemPrompt }
                ],
                temperature: 0.7,
                max_tokens: 800
            })
        });

        const json = await response.json();

        if (json.error) {
             throw new Error(json.error.message);
        }

        const resultText = json.choices[0].message.content;

        return new Response(JSON.stringify({ result: resultText }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
