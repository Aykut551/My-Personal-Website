const memory = document.getElementById("memory");
const totalKB = 16384;        //memory size
const durationMs = 1500;      // test duration

let startTime = null;
let displayedKB = 0;

function memtest(timestamp){
    if(startTime === null) startTime = timestamp;

    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / durationMs, 1);   // between 0-1
    displayedKB = Math.floor(progress * totalKB);
    memory.textContent = 'Memory Test :  ' + displayedKB;

    if(progress < 1){
        requestAnimationFrame(memtest);
    } else {
        memory.textContent = 'Memory Test :  ' + totalKB + ' KB OK';
    }
}

window.onload = function() {
    document.getElementById('commandbar').value = '';
    requestAnimationFrame(memtest);
};