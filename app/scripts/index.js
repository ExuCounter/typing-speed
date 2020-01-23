import {rusTextArray,
        engTextArray,
        ukrTextArray
}  from "./dataArrays.js";

import {
    outputText,
    currentTextArr
} from "./output-text.js";

import {
    newTextStart
} from './start-functions.js';

import './buttons.js';
import './modal-tabs.js';
import {
    openModal,
    closeModal
} from'./modal.js';

const mainText = document.getElementById('main-text');
const mainTextarea = document.getElementById('main-textarea');
const speedNumber = document.getElementById('speed-number');
const languageSelectModal = document.querySelector('.language-select-modal');
const accuracyNumber = document.getElementById('accuracy-number');
const modalSelectOptions = document.querySelectorAll('.language-select-modal option');
const modalStart = document.querySelector('.modal-start');
const modalContinue = document.querySelector('.modal-continue');
const modalEnd = document.querySelector('.modal-end');
const changeLangSpan = document.querySelector('.change-lang-span');
const modalEndSpeed = document.querySelector('.modal-end-speed');
const modalEndAccuracy = document.querySelector('.modal-end-accuracy');

function insertAdjacent(element, where, html) {
    return element.insertAdjacentHTML(where, html);

}

/* MAIN CLASS TEXT */

class Text {
    timeSpeedIncrement;
    numberSpeedIncrement;
    numberAccuracyIncrement;
    errorCounter = 0;

    calcStat(speedCounter, accuracyCounter, time){
        this.timeSpeedIncrement = setInterval(()=>(time++), 1000);
        this.numberSpeedIncrement = setInterval(()=>{
            speedNumber.innerHTML = `${Math.ceil((speedCounter * 60) / time)}`;
            }, 1000);
        this.numberAccuracyIncrement = setInterval(()=>{
            accuracyNumber.innerHTML = `${accuracyCounter}`
        }, 1000);
        mainTextarea.addEventListener('keydown', ()=>{
            if(document.querySelector('.text-error') && this.errorCounter === 0){
                this.errorCounter++;
                accuracyCounter++;
                return false;
            }
            if(!(document.querySelector('.text-error'))){
                this.errorCounter = 0;
            }
            if(document.querySelector('.text-error')){
                return false;
            }
            if(event.code === "Backspace" || event.key === 'Shift' || event.code === "Enter" || event.key === 'Alt' ||
                event.key === 'Meta' || event.key === 'Control' || event.key === 'Tab' || event.key === 'CapsLock' ||
                event.code === 'ArrowDown' || event.code === 'ArrowUp' || event.code === 'ArrowLeft' || event.code === 'ArrowRight' ||
                event.code === 'Delete' || event.code === 'End' || event.code === "Help" || event.code === 'Home' ||
                event.code === 'Insert')  return false;
            speedCounter++;
        });

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
        let wholeArr = [];
        let currentTextCounter = 0;

        mainTextarea.addEventListener('keydown', ()=>{ /* Отслеживаем последнюю нажатую кнопку */
            lastKey = event.code;
            if(event.key.length === 1){
                wholeArr.push(event.key);
            }

        });

        mainTextarea.addEventListener('input', ()=>{ /* Мониторинг текстового поля для ввода */
            let activeTexts = document.getElementsByClassName('text-active'); /* Активный текст */
            let lastWord = currentTextArr[currentTextArr.length-2];
            let mainTextareaArray = mainTextarea.value.split(' ');
            let firstWord = mainTextareaArray[0];

            for(let activeText of activeTexts) {
                if ((firstWord === currentTextArr[currentTextCounter] && lastKey === 'Space' && mainTextareaArray.length === 2 )) {
                    if(activeText.nextSibling) {
                        let sibling = activeText.nextSibling;
                        if (sibling.nextSibling) {
                            let nextSibling = sibling.nextSibling;

                            activeText.classList.add('text-done');
                            activeText.classList.remove('text-active');

                            mainTextarea.classList.remove('textarea-error');
                            nextSibling.classList.add('text-active');

                            activeText.classList.remove('text-error');

                            mainTextarea.value = '';
                            currentTextCounter += 2;
                        }
                    }
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

                if(activeText.innerHTML === lastWord && firstWord === currentTextArr[currentTextCounter]){
                    modalEndSpeed.innerHTML = speedNumber.innerHTML;
                    modalEndAccuracy.innerHTML = accuracyNumber.innerHTML;
                    openModal(modalEnd);
                    mainTextarea.blur();

                }

            }

            /* Проверка на раскладку клавиатуры */

            (function testOnRightLayout() {
                let errorCyrillic = false;
                let errorEnglish = false;

                if(modalSelectOptions){
                    let selectedOption;

                    for(let item of modalSelectOptions){
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

    createStat(speedCounter, accuracyCounter, time) {
        this.calcStat(speedCounter,accuracyCounter,time);
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

outputText(rusTextArray);

export {
    outputText,
    languageSelectModal,
    newTextStart,
    modalStart,
    modalEnd,
    mainTextarea,
    modalContinue,
    insertAdjacent,
    mainText,
    Text

}