const div = document.querySelector(".bios");
const text = "Typewriter Text Testing";
const speed = 50;

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

TypingEffect(div, text)