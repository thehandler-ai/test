<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THE HANDLER // V2.0 [BLACK SITE]</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'JetBrains+Mono', monospace; background-color: #050505; color: #00FF94; }
        .glass { background: rgba(10, 25, 10, 0.5); backdrop-filter: blur(8px); border: 1px solid #00FF94; }
        .scanline { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent 50%, rgba(0, 255, 148, 0.02) 50%); background-size: 100% 4px; pointer-events: none; z-index: 50; }
        .hidden { display: none; }
        input, textarea, select { background-color: #0a0a0a; border: 1px solid #224422; color: white; padding: 8px; font-size: 14px; }
    </style>
</head>
<body class="min-h-screen p-4 md:p-8">
    <div class="scanline"></div>
    <h1 class="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-2 drop-shadow-[0_0_10px_rgba(0,255,148,0.8)]">THE HANDLER</h1>
    <p class="text-xs text-gray-500 text-center mb-8 tracking-[0.3em]">INTEL_OPERATIONS_SUITE // V2.0</p>

    <div class="flex justify-center space-x-4 mb-8">
        <button id="nav-profiler" onclick="showView('profiler')" class="px-4 py-2 text-sm uppercase tracking-widest border-b-2 border-green-500">PROFILER</button>
        <button id="nav-handler" onclick="showView('handler')" class="px-4 py-2 text-sm uppercase tracking-widest border-b-2 border-transparent hover:border-green-500/50">HANDLER</button>
    </div>

    <!-- PROFILER VIEW -->
    <div id="profiler" class="w-full max-w-4xl mx-auto space-y-4">
        <h2 class="text-lg tracking-widest">[ :: TARGET DOSSIER :: ]</h2>
        <div class="glass p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input id="p-name" placeholder="Name/Alias (e.g., Rin)">
            <input id="p-username" placeholder="Username (e.g., midnight_6140)">
            <input id="p-age" type="number" placeholder="Age">
            <input id="p-sex" placeholder="Sex (Male/Female)">
            <textarea id="p-bio" class="md:col-span-2 h-20" placeholder="Bio / Public Intro..."></textarea>
            <textarea id="p-consumption" class="md:col-span-2 h-20" placeholder="Music/Media Consumption..."></textarea>
            <textarea id="p-leverage" class="md:col-span-2 h-20" placeholder="Known Leverage Points / Triggers..."></textarea>
            <input id="p-archetype" class="md:col-span-2" placeholder="Assigned Archetype (e.g., The Wounded Healer)">
        </div>
        <button onclick="createProfile()" id="profileBtn" class="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-3 uppercase tracking-widest transition">COMPILE DOSSIER</button>
    </div>

    <!-- HANDLER VIEW -->
    <div id="handler" class="hidden w-full max-w-4xl mx-auto space-y-4">
         <h2 class="text-lg tracking-widest">[ :: LIVE ANALYSIS :: ]</h2>
         <div class="glass p-6 space-y-4">
            <div>
                <label class="text-xs text-gray-400">SELECT TARGET</label>
                <select id="targetSelector" class="w-full mt-1"></select>
            </div>
             <div>
                <label class="text-xs text-gray-400">SELECT YOUR ARCHETYPE</label>
                 <select id="archetypeSelector" class="w-full mt-1">
                    <option value="Sovereign">Sovereign</option>
                    <option value="Ghost">Ghost</option>
                    <option value="Siren">Siren</option>
                </select>
            </div>
            <textarea id="handlerInput" class="w-full h-24" placeholder="Paste text message or situation..."></textarea>
            <button onclick="runHandler()" id="handlerBtn" class="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-3 uppercase tracking-widest transition">EXECUTE</button>
            <div id="handlerOutput" class="mt-4 text-sm whitespace-pre-wrap border-t border-gray-800 pt-4"></div>
         </div>
    </div>

    <script>
        let targets = [];

        function showView(view) {
            document.getElementById('profiler').style.display = view === 'profiler' ? 'block' : 'none';
            document.getElementById('handler').style.display = view === 'handler' ? 'block' : 'none';
            document.getElementById('nav-profiler').classList.toggle('border-green-500', view === 'profiler');
            document.getElementById('nav-handler').classList.toggle('border-green-500', view === 'handler');
            if (view === 'handler') loadTargets();
        }

        async function createProfile() {
            const btn = document.getElementById('profileBtn');
            btn.innerText = "COMPILING..."; btn.disabled = true;

            const profileData = {
                name: document.getElementById('p-name').value,
                username: document.getElementById('p-username').value,
                age: parseInt(document.getElementById('p-age').value) || null,
                sex: document.getElementById('p-sex').value,
                bio_raw: document.getElementById('p-bio').value,
                consumption_data: { content: document.getElementById('p-consumption').value },
                leverage_points: document.getElementById('p-leverage').value,
                archetype: document.getElementById('p-archetype').value,
            };

            if (!profileData.name) {
                alert("Name is required.");
                btn.innerText = "COMPILE DOSSIER"; btn.disabled = false;
                return;
            }

            try {
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mode: 'create_profile', data: profileData })
                });
                const json = await response.json();
                if (json.error) throw new Error(json.error);
                alert(`DOSSIER CREATED: ${json.newProfile[0].name}`);
                document.getElementById('profiler').querySelectorAll('input, textarea').forEach(el => el.value = '');
            } catch (error) {
                alert("VAULT ERROR: " + error.message);
            } finally {
                btn.innerText = "COMPILE DOSSIER"; btn.disabled = false;
            }
        }

        async function loadTargets() {
            const selector = document.getElementById('targetSelector');
            selector.innerHTML = '<option>Loading targets...</option>';
            try {
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mode: 'load_targets' })
                });
                const { targets: loadedTargets, error } = await response.json();
                if (error) throw new Error(error);
                targets = loadedTargets;
                selector.innerHTML = targets.map(t => `<option value="${t.id}">${t.name} (${t.archetype || 'N/A'})</option>`).join('');
            } catch (error) {
                alert("FAILED TO LOAD TARGETS FROM VAULT: " + error.message);
            }
        }
        
        async function runHandler() {
            const btn = document.getElementById('handlerBtn');
            const outputDiv = document.getElementById('handlerOutput');
            
            const selectedId = document.getElementById('targetSelector').value;
            const input = document.getElementById('handlerInput').value;
            const archetype = document.getElementById('archetypeSelector').value;

            if (!selectedId || !input) return alert("TARGET AND INPUT REQUIRED.");

            btn.innerText = "PROCESSING..."; btn.disabled = true;
            outputDiv.innerText = "";

            try {
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        mode: "handle",
                        data: {
                            targetId: selectedId,
                            identity: "Zia",
                            userArchetype: archetype,
                            input: input,
                        }
                    })
                });

                const json = await response.json();
                if (json.error) throw new Error(json.error);
                if (!json.result) throw new Error("AI returned empty data.");
                outputDiv.innerText = json.result;
            } catch (error) {
                outputDiv.innerText = "SYSTEM FAILURE:\n" + error.message;
            } finally {
                btn.innerText = "EXECUTE";
                btn.disabled = false;
            }
        }
        
        showView('profiler');
    </script>
</body>
</html>
