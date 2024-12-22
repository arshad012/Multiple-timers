
const speechSynth = window.speechSynthesis;
const timers_section = document.getElementById('timers-section');
let timersDivCount = 1;

document.getElementById('set-timer').addEventListener('click', () => {
    let hours = document.getElementById('hours').value;
    let minutes = document.getElementById('minutes').value;
    let seconds = document.getElementById('seconds').value;

    if (!hours) hours = 0;
    else hours = Number(hours);

    if (!minutes) minutes = 0;
    else minutes = Number(minutes);

    if (!seconds) seconds = 0;
    else seconds = Number(seconds);

    let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    
    hours = document.getElementById('hours').value = '';
    minutes = document.getElementById('minutes').value = '';
    seconds = document.getElementById('seconds').value = '';

    if(totalSeconds > 0) createTimer(totalSeconds);
})


function createTimer(totalSeconds) {
    
    const timerUI = document.createElement('div');
    let timerId = `timer${timersDivCount}`;
    timersDivCount++;
    timerUI.id = timerId;
    timerUI.className = 'box';

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor(totalSeconds / 60) % 60;
    let seconds = (totalSeconds % 60);

    const staticTextDiv = document.createElement('div');
    staticTextDiv.className = 'static-text';
    staticTextDiv.innerText = 'Time left:';

    const showTimeDiv = document.createElement('show-time');
    showTimeDiv.className = 'show-time';
    
    const hours_p = document.createElement('p');
    hours_p.className = 'hours-left';
    hours_p.innerText = hours;

    const minutes_p = document.createElement('p');
    minutes_p.className = 'minutes-left';
    minutes_p.innerText = minutes;

    const seconds_p = document.createElement('p');
    seconds_p.className = 'seconds-left';
    seconds_p.innerText = seconds;

    const span1 = document.createElement('span');
    span1.innerText = ':';
    const span2 = document.createElement('span');
    span2.innerText = ':';

    showTimeDiv.append(hours_p, span1, minutes_p, span2, seconds_p);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick  = () => {
        deleteTimer(deleteButton);
    }

    timerUI.append(staticTextDiv, showTimeDiv, deleteButton);
    timers_section.append(timerUI);


    let intervalId = setInterval(async () => {
        if (totalSeconds < 0) {
            clearInterval(intervalId);

            timerUI.innerHTML = null;
            timerUI.style.backgroundColor = '#f0f757';

            const hiddenText = document.createElement('div');
            hiddenText.innerText = '||||||||||';
            hiddenText.style.visibility = 'hidden';

            const timerEndMessage = document.createElement('p');
            timerEndMessage.classList = 'timerEndMessage';
            timerEndMessage.innerText = 'Timer Is Up !';

            const stopButton = document.createElement('button');
            stopButton.className = 'stopButton';
            stopButton.innerText = 'Stop';
            stopButton.onclick = () => {
                stopButton.parentNode.remove();
            }

            timerUI.append(hiddenText, timerEndMessage, stopButton);

            const newUtter = new SpeechSynthesisUtterance(`Time is up`);
            speechSynth.speak(newUtter);
        }
        else {
            const currentTimer = document.getElementById(timerId);
            const hours_left = currentTimer.querySelector('.hours-left');
            const minutes_left = currentTimer.querySelector('.minutes-left');
            const seconds_left = currentTimer.querySelector('.seconds-left');
    
            hours = Math.floor(totalSeconds / 3600);
            minutes = Math.floor(totalSeconds / 60) % 60;
            seconds = (totalSeconds % 60);
    
            hours_left.innerText = hours;
            minutes_left.innerText = minutes;
            seconds_left.innerText = seconds;
    
            totalSeconds--;
        }
    }, 1000);


    function deleteTimer(deleteButton) {
        clearInterval(intervalId);
        deleteButton.parentNode.remove();
    }
}
