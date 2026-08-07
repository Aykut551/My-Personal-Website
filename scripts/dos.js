var input = document.getElementById("commandbar");
let commands = null;
const div = document.querySelector(".output");
const text = "Typewriter Text Testing";
const speed = 55;

function TypingEffect(element, text, i = 0){
    if(i === 0){
        element.textContent = "";
    }
    element.textContent += text[i];
    //stops when the text ends
    if(i == text.length - 1){
        return;
    }
    setTimeout(() => TypingEffect(element, text, i + 1), speed);
}

async function loadCommandsOnce() {
    if (commands) return commands; // cache so we don't refetch every keypress
    const response = await fetch('../commands.json');
    commands = await response.json();
    return commands;
}

async function runCommand(userInput) {
    const cmds = await loadCommandsOnce();

    // support "help <command>" as a special case
    const parts = userInput.split(" ");
    const isHelpRequest = parts[0] === "help" && parts[1];

    if (isHelpRequest) {
        const target = parts[1];
        if (cmds.hasOwnProperty(target)) {
            console.log(cmds[target].helpOutput);
            TypingEffect(div, cmds[target].helpOutput)
        } else {
            console.log("No help available for:", target);
            TypingEffect(div, "No help available for:" + ' ' + target)
        }
        return;
    }

    if (cmds.hasOwnProperty(userInput)) {
            if (userInput === "help") {
        // Generate the command list dynamically from JSON keys.
        const commandNames = Object.keys(cmds);
        TypingEffect(div ,"Available commands: " + commandNames.join(", "));
        return;
        }
        console.log(cmds[userInput].output);
        TypingEffect(div, cmds[userInput].output)
    } else {
        console.log("Unknown command:", userInput);
        var Unknown = "Unknown command:" + ' ' + userInput
        TypingEffect(div, Unknown)
    }

}

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const typed = input.value.trim();
        runCommand(typed);
        input.value = "";
    }
});

window.onload = function() {
    var text = 'Welcome the TTY'
    window.addEventListener('DOMContentLoaded', () => input.focus());
    TypingEffect(div, text)
};
