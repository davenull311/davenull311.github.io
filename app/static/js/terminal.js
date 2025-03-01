document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const input = document.getElementById('commandInput');

    // Fetch skills JSON
    fetch('/static/skills.json')
        .then(response => response.json())
        .then(data => {
            const skills = data.skills;

            // Handle commands
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const command = input.value.trim().toLowerCase();
                    input.value = '';
                    processCommand(command, skills);
                }
            });
        });

    // Typewriter effect
    function typeText(text, callback) {
        let i = 0;
        output.innerHTML += '<p>';
        const interval = setInterval(() => {
            output.lastChild.textContent += text[i];
            output.scrollTop = output.scrollHeight;
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                output.innerHTML += '</p>';
                if (callback) callback();
            }
        }, 30);
    }

    // Process user commands
    function processCommand(command, skills) {
        output.innerHTML += `<p>> ${command}</p>`;

        if (command === 'help') {
            typeText('Available commands: list skills, show projects --skill=<name>, clear');
        } else if (command === 'list skills') {
            const skillList = Object.keys(skills).join(', ');
            typeText(`Skills: ${skillList}`);
        } else if (command.startsWith('show projects --skill=')) {
            const skill = command.split('=')[1]?.trim();
            if (skills[skill]) {
                const projects = skills[skill].projects.join(', ');
                typeText(`${skill} Projects: ${projects}`);
            } else {
                typeText(`Error: Skill '${skill}' not found.`);
            }
        } else if (command === 'clear') {
            output.innerHTML = '';
        } else {
            typeText('Command not recognized. Type "help" for options.');
        }
    }
});