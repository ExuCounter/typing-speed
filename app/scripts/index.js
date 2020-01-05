import {
    ukrTextArray,
    rusTextArray,
    engTextArray
} from "./dataArrays.js";

const mainText = document.getElementById('main-text');
const mainTextarea = document.getElementById('main-textarea');
const speedNumber = document.getElementById('speed-number');
const languageSelect = document.getElementById('language-select');
const tryAgainBtn = document.getElementById('try-again');
const buttonStart = document.querySelector('.button-start');

let textOutput = null;

function insertAdjacent(element, where, html) {
    return element.insertAdjacentHTML(where, html);

}

export class Text {
    timeIncrement;
    numberIncrement;

    calcSpeed(speedCounter, time){
        this.timeIncrement = setInterval(()=>(time++), 1000);
        this.numberIncrement = setInterval(()=>{speedNumber.innerHTML = `${Math.ceil((speedCounter*60)/time)}`}, 1500);
        mainTextarea.addEventListener('keydown', ()=>{
            if(event.code === "Backspace" || event.key === 'Shift' || event.code === "Enter" || event.key === 'Alt' ||
                event.key === 'Meta' || event.key === 'Control' || event.key === 'Tab' || event.key === 'CapsLock' ||
                event.code === 'ArrowDown' || event.code === 'ArrowUp' || event.code === 'ArrowLeft' || event.code === 'ArrowRight' ||
                event.code === 'Delete' || event.code === 'End' || event.code === "Help" || event.code === 'Home' ||
                event.code === 'Insert')  return false;
            speedCounter++;
        });

    }

    mainTextAreaHandler(){
        mainTextarea.addEventListener('input', ()=>{
            let activeText = document.getElementsByClassName('text-active');
            for(let text of activeText){
                let mainTextareaArray = mainTextarea.value.split('');
                let lastWord = mainTextareaArray[mainTextareaArray.length-1];
                if(text.innerHTML.endsWith(lastWord)){
                    let sibling = text.nextSibling;
                    text.classList.add('text-done');
                    text.classList.remove('text-active');
                    sibling.classList.add('text-active');

                }

            }

        });
    }

    createText(speedCounter, time) {
        this.calcSpeed(speedCounter,time);
        this.mainTextAreaHandler();

    }

    clearTextInterval(){
        setInterval(()=>{clearInterval(this.timeIncrement)},0);
        setInterval(()=>{clearInterval(this.numberIncrement)},0);
        speedNumber.innerHTML = '0';

    }

}

function newTextStart() {
    mainTextarea.value = '';
    mainTextarea.focus();

    if(textOutput){
        textOutput.clearTextInterval();
        newText();
    }
    else{
        newText();

    }
}

function newText() {
    textOutput = new Text();
    textOutput.createText(0,0);

}

buttonStart.addEventListener('click', ()=>{
    let selectedLang = eval((languageSelect.value).slice(0, 3).toLowerCase() + 'TextArray');
    newTextStart();
});

tryAgainBtn.addEventListener('click', ()=>{
    let selectedLang = eval((languageSelect.value).slice(0, 3).toLowerCase() + 'TextArray');
    outputText(selectedLang);
});

languageSelect.addEventListener('change', ()=>{
    let selectedLang = eval((languageSelect.value).slice(0, 3).toLowerCase() + 'TextArray');
    outputText(selectedLang);
});

function outputText(textArray){
    let textNumber = Math.floor(Math.random() * (textArray.length));
    mainText.innerHTML = '';
    mainTextarea.value = '';

    if(textOutput){
        textOutput.clearTextInterval();
    }

    let text = textArray[textNumber].split(' ');

    for(let i = 0; i < text.length; i++){
        if(i===0){
            insertAdjacent(mainText, 'beforeend', `<span class='text-active'>${text[0]}</span>`);
            insertAdjacent(mainText, 'beforeend', `<span class='text-default'> </span>`);
        }
        else{
            insertAdjacent(mainText, 'beforeend', `<span class='text-default'>${text[i]}</span>`);
            insertAdjacent(mainText, 'beforeend', `<span class='text-default'> </span>`);

        }
    }

}

outputText(engTextArray);

export{
    newTextStart,
    outputText

}
