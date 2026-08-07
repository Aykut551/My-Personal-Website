const memory = document.getElementById("memory");
const hdd = document.getElementById("hdd");
const totalKB = 16384;        //memory size
const durationMs = 3000;      //memory test duration
const hddcheckMS = 1250;      //hdd test duration

let startTime = null;
let displayedKB = 0;

function memtest(timestamp){
    return new Promise((finished) => {
        function step(timestamp) {
            if(startTime === null) startTime = timestamp;

            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / durationMs, 1);   // between 0-1
            displayedKB = Math.floor(progress * totalKB);
            memory.textContent = 'Memory Test :  ' + displayedKB;

            if(progress < 1){
                requestAnimationFrame(step);
            } else {
                memory.textContent = 'Memory Test :  ' + totalKB + ' KB OK';
                setTimeout(finished("MemTest finished"), durationMs % 10);
            }
        }
        requestAnimationFrame(step);
    });
}

function hddcheck(){
        return new Promise((finished) => {
            
            setTimeout(() => {
            requestAnimationFrame(() => { hdd.textContent = "Award Plug and Play BIOS Extension  v1.0A\nCopyright (C) 1998, Award Software, Inc."; });
        }, durationMs % 10);
        finished("HDD check finished")

    });
}

function hddcheckanimation(elementID, label, drive, hddcheckMS, space, maxDots =3 ) {
    return new Promise((finished) => {
        const targetelement = document.getElementById(elementID)
        let dotCount = 0

        targetelement.textContent = label; 
        const interval = setInterval(() => {
            dotCount++;

            if (dotCount <= maxDots) {
                targetelement.textContent = label + space + ".".repeat(dotCount);
            } else {
                clearInterval(interval);
                targetelement.textContent = label + space + ".".repeat(maxDots) + " " + drive;
                finished("Hdd Check" + elementID + "Finished");
            }
        }, hddcheckMS);
    });
}

async function dochecks() {
    
    const memtestresult = await memtest()
    console.log(memtestresult)

    const hddtestresult = await hddcheck()
    console.log(hddtestresult)

    const hddtest1 = await hddcheckanimation("hddtest1", "Detecting IDE Primary Master", "None", hddcheckMS, "‎ ‎ ‎ ")
    const hddtest2 = await hddcheckanimation("hddtest2", "Detecting IDE Primary Slave", "None", hddcheckMS, "‎ ‎ ‎ ‎ ")
    const hddtest3 = await hddcheckanimation("hddtest3", "Detecting IDE Secondary Master", "None", hddcheckMS, "‎ ")
    const hddtest4 = await hddcheckanimation("hddtest4", "Detecting IDE Secondary Slave", "None", hddcheckMS, "‎ ‎ ")
    setTimeout(window.location.href = 'html/dos.html', 100)
}
window.onload = function() {
    //document.getElementById('commandbar').value = '';
    dochecks();
};