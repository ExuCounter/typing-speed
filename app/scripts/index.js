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
const accuracyNumber = document.getElementById('accuracy-number');

let textOutput = null;

function insertAdjacent(element, where, html) {
    return element.insertAdjacentHTML(where, html);

}

/* MAIN CLASS TEXT */

class Text {
    timeSpeedIncrement;
    numberSpeedIncrement;
    numberAccuracyIncrement;

    calcStat(speedCounter, time){
        this.timeSpeedIncrement = setInterval(()=>(time++), 1000);
        this.numberSpeedIncrement = setInterval(()=>{speedNumber.innerHTML = `${Math.ceil((speedCounter*60)/time)}`}, 1000);
        this.numberAccuracyIncrement = setInterval(()=>{accuracyNumber.innerHTML = `${Math.ceil((1)/time)}`}, 1000);
        mainTextarea.addEventListener('keydown', ()=>{
            if(event.code === "Backspace" || event.key === 'Shift' || event.code === "Enter" || event.key === 'Alt' ||
                event.key === 'Meta' || event.key === 'Control' || event.key === 'Tab' || event.key === 'CapsLock' ||
                event.code === 'ArrowDown' || event.code === 'ArrowUp' || event.code === 'ArrowLeft' || event.code === 'ArrowRight' ||
                event.code === 'Delete' || event.code === 'End' || event.code === "Help" || event.code === 'Home' ||
                event.code === 'Insert')  return false;
            speedCounter++;
        });

    }

    calcAccuracy(){

    }

    /* sasha one love  || sasha sasha || space space*/
    /* [sasha,one,love] */
    /* sasha */

    mainTextAreaHandler(){
        let lastKey = null;
        let lastWord = null;

        mainTextarea.addEventListener('keydown', ()=>{
            lastKey = event.code;
            if(lastWord === ' ' && lastKey === 'Backspace'){
                alert(true);
            }
        });

        mainTextarea.addEventListener('input', ()=>{

            let activeText = document.getElementsByClassName('text-active');
            for(let text of activeText){
                let mainTextareaArray = mainTextarea.value.split(' ');
                lastWord = mainTextareaArray[mainTextareaArray.length-1];

                let prevSibling = text.previousSibling;
                let nextSibling = text.nextSibling;

                mainTextarea.classList.remove('textarea-error');
                text.classList.remove('text-error');

                if(lastWord === text.innerHTML){
                    let sibling = text.nextSibling;
                    text.classList.add('text-done');
                    text.classList.remove('text-active');
                    sibling.classList.add('text-active');

                    text.classList.remove('text-error');

                }
                else if(text.innerHTML === ' ' && lastKey === 'Space'){
                    let sibling = text.nextSibling;
                    text.classList.add('text-done');
                    text.classList.remove('text-active');
                    sibling.classList.add('text-active');

                    text.classList.remove('text-error');

                }
                else if(!(text.innerHTML.startsWith(lastWord))){
                    mainTextarea.classList.add('textarea-error');
                    text.classList.add('text-error');

                }
                if(lastKey === 'Backspace' && ( prevSibling.innerHTML.indexOf(" ") || document.querySelector('.text-error'))){
                    prevSibling.classList.remove('text-done');
                    text.classList.remove('text-active');
                    prevSibling.classList.add('text-active');

                    text.classList.remove('text-error');
                    mainTextarea.classList.remove('textarea-error');

                }

            }

        });

    }

    /* Если */

    createText(speedCounter, time) {
        this.calcStat(speedCounter,time);
        this.mainTextAreaHandler();

    }

    clearTextInterval(){
        setInterval(()=>{clearInterval(this.timeSpeedIncrement)},0);
        setInterval(()=>{clearInterval(this.numberSpeedIncrement)},0);
        setInterval(()=>{clearInterval(this.numberAccuracyIncrement)},0);
        speedNumber.innerHTML = '0';
        accuracyNumber.innerHTML = '0';

    }

}

/* HANDLE TEXT */

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
newTextStart();

/* BUTTONS */

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

/*
*  Шла маша по шосе
*  ШЫла мЫаша по шЫосе  16 букв и 3 ошибки       10 символов == 100%    1 символ == 1%
*
* */