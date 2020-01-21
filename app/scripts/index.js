import {
    ukrTextArray,
    rusTextArray,
    engTextArray
} from "./dataArrays.js";

const mainText = document.getElementById('main-text');
const mainTextarea = document.getElementById('main-textarea');
const speedNumber = document.getElementById('speed-number');
const languageSelectWindow = document.querySelector('.language-select-window');
const languageSelectModal = document.querySelector('.language-select-modal');
const tryAgainBtn = document.getElementById('try-again');
const buttonStart = document.querySelector('.start-btn');
const accuracyNumber = document.getElementById('accuracy-number');
const modalSelectOptions = document.querySelectorAll('.language-select-modal option');
const windowSelectOptions = document.querySelectorAll('.language-select-window option');
const modalStart = document.querySelector('.modal-start');
const modalContinue = document.querySelector('.modal-continue');
const changeLangSpan = document.querySelector('.change-lang-span');
const continueBtn = document.querySelector('.continue-btn');

let textOutput = null;
let selectedLang = '';
let textNumber = 0;
let currentTextCounter = 0;
let currentTextArr = [];

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

            if(document.querySelector('.text-error')) return false;
            speedCounter++;
        });

    }

    calcAccuracy(){

    }

    addError(mainTextarea, activeText){
        mainTextarea.classList.add('textarea-error');
        activeText.classList.add('text-error');
    }

    removeError(mainTextarea, activeText){
        mainTextarea.classList.remove('textarea-error');
        activeText.classList.remove('text-error');
    }

    mainTextAreaHandler(){
        let lastKey = null;
        let wholeArr = []

        mainTextarea.addEventListener('keydown', ()=>{ /* Отслеживаем последнюю нажатую кнопку */
            lastKey = event.code;
            if(event.key.length === 1){
                wholeArr.push(event.key);
            }
            console.log(wholeArr);

        });

        mainTextarea.addEventListener('input', ()=>{ /* Мониторинг текстового поля для ввода */
            let activeTexts = document.getElementsByClassName('text-active'); /* Активный текст */

            let mainTextareaArray = mainTextarea.value.split(' ');
            let firstWord = mainTextareaArray[0];

            for(let activeText of activeTexts) {
                if ((firstWord === currentTextArr[currentTextCounter] && lastKey === 'Space' && mainTextareaArray.length === 2 )) {
                    let sibling = activeText.nextSibling;
                    let nextSibling = sibling.nextSibling;

                    activeText.classList.add('text-done');
                    activeText.classList.remove('text-active');

                    mainTextarea.classList.remove('textarea-error');
                    nextSibling.classList.add('text-active');

                    activeText.classList.remove('text-error');

                    mainTextarea.value = '';
                    currentTextCounter += 2;
                }

                if((!(firstWord === currentTextArr[currentTextCounter-2]) && lastKey === 'Space' && mainTextareaArray.length > 1) ||
                    (!(firstWord === currentTextArr[currentTextCounter]) && lastKey === 'Backspace' && mainTextareaArray.length > 1) ||
                    (mainTextareaArray.length > 1) ||
                    !(activeText.innerHTML.startsWith(firstWord))){
                    this.addError(mainTextarea, activeText);
                } else{
                    this.removeError(mainTextarea, activeText);
                }

                if(lastKey === 'Space' && mainTextarea.value === ''){
                    this.removeError(mainTextarea, activeText);
                }

            }

            /* Проверка на раскладку клавиатуры */

            (function testOnRightLayout() {
                let errorCyrillic = false;
                let errorEnglish = false;

                if(modalSelectOptions){
                    let selectedOption;

                    for(let item of windowSelectOptions){
                        if(item.selected){
                            selectedOption = item.value;
                        }
                    }

                    if(lastKey === 'Space' || lastKey === null || lastKey === 'Backspace') return false;
                    if(selectedOption === 'ukr' || selectedOption === 'rus'){
                        haveCyrillic();
                        if(errorCyrillic){
                            modalContinue.classList.remove('d-flex');
                            mainTextarea.focus();
                        }
                        else{
                            mainTextarea.blur();
                            changeLangSpan.innerHTML = 'Русский';
                            modalContinue.classList.add('d-flex');
                        }
                    }

                    if(selectedOption === 'eng'){
                        haveEnglish();
                        if(errorEnglish){
                            closeModal(modalContinue);
                            mainTextarea.focus();
                        }
                        else{
                            mainTextarea.blur();
                            changeLangSpan.innerHTML = 'English';
                            modalContinue.classList.add('d-flex');
                        }

                    }

                }

                function haveCyrillic() {
                    let str = mainTextarea.value.split(' ').join('');
                    for(let char of str){
                        if(/[а-я-0-9-,-.-!-=]/i.test(char)){
                            errorCyrillic = true;
                        }
                        else{
                            errorCyrillic = false;
                        }
                    }
                }

                function haveEnglish() {
                    let str = mainTextarea.value.split(' ').join('');
                    for(let char of str){
                        if(/[a-z-0-9-,-.-!-=]/i.test(char)){
                            errorEnglish = true;
                        }
                        else{
                            errorEnglish = false;
                        }
                    }
                }

            })();

        });

    }

    /* Функция создания новых стат */

    createStat(speedCounter, time) {
        this.calcStat(speedCounter,time);
        this.mainTextAreaHandler();

    }

    /* Очистка скорости, точности */

    clearTextInterval(){
        setInterval(()=>{clearInterval(this.timeSpeedIncrement)},0);
        setInterval(()=>{clearInterval(this.numberSpeedIncrement)},0);
        setInterval(()=>{clearInterval(this.numberAccuracyIncrement)},0);
        speedNumber.innerHTML = '0';
        accuracyNumber.innerHTML = '0';

    }

}

/* HANDLE TEXT */

/* Функция запуска нового текста */

function newTextStart() {
    mainTextarea.value = '';

    if(textOutput){
        textOutput.clearTextInterval();
        newText();
    }
    else{
        newText();

    }
}

/* Функция создания нового экземпляра */

function newText() {
    textOutput = new Text();
    textOutput.createStat(0,0);

}

/* Функция вывода текста */

function outputText(textArray){
    textNumber = Math.floor(Math.random() * (textArray.length));
    mainText.innerHTML = '';
    mainTextarea.value = '';

    if(textOutput){
        textOutput.clearTextInterval();
    }

    let text = textArray[textNumber].split(' ');

    currentTextArr = [];
    for(let word of text){
        currentTextArr.push(word);
        currentTextArr.push(' ');
    }

    for(let i = 0; i < currentTextArr.length; i++){
        if(i===0){
            insertAdjacent(mainText, 'beforeend', `<span class='text-active'>${currentTextArr[0]}</span>`);
        }
        else{
            insertAdjacent(mainText, 'beforeend', `<span class='text-default'>${currentTextArr[i]}</span>`);

        }
    }

}

function openModal(modal) {
    modal.classList.add('d-flex');
    mainTextarea.classList.remove('textarea-error');

}

function closeModal(modal) {
    modal.classList.remove('d-flex');
    mainTextarea.focus();

}

outputText(rusTextArray);
newTextStart();

/* BUTTONS */

languageSelectModal.addEventListener('change', ()=>{
    selectedLang = eval((languageSelectModal.value).slice(0, 3).toLowerCase() + 'TextArray');
    outputText(selectedLang);
    closeModal(modalContinue);
});

buttonStart.addEventListener('click', ()=>{
    closeModal(modalStart);
    newTextStart();
});

tryAgainBtn.addEventListener('click', ()=>{
    selectedLang = eval((languageSelectWindow.value).slice(0, 3).toLowerCase() + 'TextArray');
    openModal(modalStart);
    outputText(selectedLang);
});

continueBtn.addEventListener('click', ()=>{
    closeModal(modalContinue);
});

/* Открытие и закрытие модальных окон на space и enter */

document.addEventListener('keydown', ()=>{
    if(modalStart.classList.contains('d-flex')) {
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            closeModal(modalStart);
            newTextStart();
        }
    }
    if(modalContinue.classList.contains('d-flex')) {
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            closeModal(modalContinue);
        }
    }

});