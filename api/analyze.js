export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    // Initialize Supabase connection inside the handler
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

    try {
        const { mode, data } = await req.json();

        // --- MODE A: LOAD ALL TARGETS ---
        if (mode === "load_targets") {
            const { data: targets, error } = await supabase.from('targets').select('id, name, archetype').order('created_at', { ascending: false });
            if (error) throw error;
            return new Response(JSON.stringify({ targets }), { headers: { 'Content-Type': 'application/json' } });
        }

        // --- MODE B: CREATE A NEW PROFILE ---
        if (mode === "create_profile") {
            const { data: newProfile, error } = await supabase.from('targets').insert([data]).select();
            if (error) throw error;
            return new Response(JSON.stringify({ newProfile }), { headers: { 'Content-Type': 'application/json' } });
        }

        // --- MODE C: RUN THE HANDLER ANALYSIS ---
        if (mode === "handle") {
            const { targetId, identity, userArchetype, input } = data;
            
            // 1. Fetch the full target profile from the Vault
            const { data: targetProfile, error: profileError } = await supabase
                .from('targets')
                .select('*')
                .eq('id', targetId)
                .single();

            if (profileError) throw profileError;

            // 2. Prepare the prompt for the AI
            const apiKey = process.env.GROQ_API_KEY;
            const url = 'https://api.groq.com/openai/v1/chat/completions';

            const systemPrompt = `
                You are 'The Handler', a master social strategist.
                
                CONTEXT:
                - The User is: "${identity}"
                - The User's chosen Archetype for this reply is: "${userArchetype}"
                - The Target's Profile is: ${JSON.stringify(targetProfile)}
                - The current situation/text to analyze is: "${input}"

                YOUR TASK:
                Analyze the situation based on the Target's known profile. Provide a Power score, a concise Intent analysis, and 3 distinct Reply Options for the User to send. The replies must match the User's chosen Archetype.

                OUTPUT FORMAT (Strict text, no markdown):
                POWER: [Score % for ${identity}]
                INTENT: [Hidden meaning based on Target's profile]
                
                REPLY OPTIONS:
                1. [Option A]
                2. [Option B]
                3. [Option C]
            `;

            // 3. Call the AI
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [{ role: "user", content: systemPrompt }],
                    temperature: 0.7,
                    max_tokens: 1024,
                })
            });

            const json = await response.json();
            if (json.error) throw new Error(json.error.message);
            
            const resultText = json.choices[0].message.content;
            return new Response(JSON.stringify({ result: resultText }), { headers: { 'Content-Type': 'application/json' } });
        }

        return new Response('Invalid mode specified', { status: 400 });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
