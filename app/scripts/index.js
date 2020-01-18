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
const modalLangError = document.querySelector('.modal-lang-error');
const changeLangSpan = document.querySelector('.change-lang-span');
const continueBtn = document.querySelector('.continue-btn');

let textOutput = null;
let selectedLang = '';

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

    mainTextAreaHandler(){
        let lastKey = null;
        let lastWord = null;

        mainTextarea.addEventListener('keydown', ()=>{ /* Отслеживаем последнюю нажатую кнопку */
            lastKey = event.code;
        });

        mainTextarea.addEventListener('input', ()=>{ /* Мониторинг текстового поля для ввода */

            let activeText = document.getElementsByClassName('text-active'); /* Активный текст */
            for(let text of activeText){
                let mainTextareaArray = mainTextarea.value.split(' ');
                lastWord = mainTextareaArray[mainTextareaArray.length-1];

                let prevSibling = text.previousSibling;
                let nextSibling = text.nextSibling;

                let nodes = document.querySelectorAll('.text-done');
                let textDone = nodes[nodes.length-1];

                let lastWordWithoutErr = null;


                mainTextarea.classList.remove('textarea-error');
                text.classList.remove('text-error');

                /* Проверка на совпадение последних слов */

                if(lastWord === text.innerHTML){
                    let sibling = text.nextSibling;
                    text.classList.add('text-done');
                    text.classList.remove('text-active');
                    sibling.classList.add('text-active');

                    text.classList.remove('text-error');

                }

                /* При нажатии на кнопку SPACE */
                if(lastKey === 'Space' && text.innerHTML === ' '){
                    if(text.innerHTML.endsWith(lastWord) && !(document.querySelector('text-error'))){
                        /* Если не существует ошибки и следующий символ пробел, переключаем активный текст  */
                        let sibling = text.nextSibling;
                        text.classList.add('text-done');
                        text.classList.remove('text-error');
                        text.classList.remove('text-active');
                        sibling.classList.add('text-active');

                        text.classList.remove('text-error');
                    }
                    else{
                        lastWordWithoutErr = textDone.previousSibling;
                        text.classList.add('text-error');
                        mainTextarea.classList.add('textarea-error');
                        mainTextarea.classList.add('left-spaces-error');
                    }

                }
                else if(!(text.innerHTML.startsWith(lastWord))){
                    /* Если слово не совпадает кидаем ошибку */
                    mainTextarea.classList.add('textarea-error');
                    text.classList.add('text-error');

                    lastWordWithoutErr = textDone.previousSibling;

                }
                if(lastKey === 'Backspace' && ( document.querySelector('.text-error') || prevSibling )){
                    for(let textErr of document.getElementsByClassName('text-error')){
                        if(textErr.previousSibling){
                            let textErrPreviousSibling = textErr.previousSibling;
                            if(textErrPreviousSibling.previousSibling){
                                let lastDoneElement = textErrPreviousSibling.previousSibling;
                                if(lastDoneElement){
                                    if(lastWord === lastDoneElement.innerHTML){
                                        prevSibling.classList.remove('text-done');
                                        text.classList.remove('text-active');
                                        prevSibling.classList.add('text-active');

                                        text.classList.remove('text-error');
                                        mainTextarea.classList.remove('textarea-error');
                                    }
                                }
                            }
                        }
                        else{
                            if(lastWord === textErr.innerHTML){
                                text.classList.remove('text-active');

                                text.classList.remove('text-error');
                                mainTextarea.classList.remove('textarea-error');
                            }
                        }
                    }
                    if(prevSibling){
                        if(prevSibling.innerHTML.indexOf(" ")){
                            prevSibling.classList.remove('text-done');
                            text.classList.remove('text-active');
                            prevSibling.classList.add('text-active');

                            text.classList.remove('text-error');
                            mainTextarea.classList.remove('textarea-error');
                        }
                    }

                }

                console.log(mainTextareaArray.length);
                console.log( Math.ceil(nodes.length/2 + 1));

                if(lastKey === 'Backspace' && mainTextarea.classList.contains('left-spaces-error')){
                    if(!(((mainTextareaArray.length) === Math.ceil(nodes.length/2 + 1)) && text.indexOf(lastWord))){
                        mainTextarea.classList.add('textarea-error');
                        text.classList.add('text-error');
                        mainTextarea.classList.add('left-spaces-error');

                        console.log('backspace');
                    }

                }
                if(document.querySelector('.text-error')){
                    console.log(true);
                }
                else {
                    console.log(false);
                    mainTextarea.classList.remove('left-spaces-error');
                }

                /* Проверка на раскладку клавиатуры */

                if(modalSelectOptions){
                    let changeLang = '';
                    let selectedOption;

                    for(let item of windowSelectOptions){
                        if(item.selected){
                            selectedOption = item.value;
                        }
                    }

                    if(lastKey === 'Space' || lastKey === null || lastKey === 'Backspace') return false;

                    if(selectedOption === 'ukr' || selectedOption === 'rus'){
                        if(/[а-я-0-9]/i.test(lastWord) && ( selectedOption === 'ukr' || selectedOption === 'rus' )){
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
                        if(/[a-z-0-9]/i.test(lastWord)){
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

            }

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

function dependenceSelect(select, comparable){
    for(let option of select){
        if(option.value === comparable.value){
            option.selected = true;
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
/* BUTTONS */



languageSelectModal.addEventListener('change', ()=>{
    selectedLang = eval((languageSelectModal.value).slice(0, 3).toLowerCase() + 'TextArray');
    dependenceSelect(windowSelectOptions, languageSelectModal);
    outputText(selectedLang);
    closeModal(modalContinue);
});

buttonStart.addEventListener('click', ()=>{
    closeModal(modalStart);
    newTextStart();
});

tryAgainBtn.addEventListener('click', ()=>{
    selectedLang = eval((languageSelectWindow.value).slice(0, 3).toLowerCase() + 'TextArray');
    dependenceSelect(modalSelectOptions, languageSelectWindow);
    openModal(modalStart);
    outputText(selectedLang);
});

languageSelectWindow.addEventListener('change', ()=>{
    selectedLang = eval((languageSelectWindow.value).slice(0, 3).toLowerCase() + 'TextArray');
    dependenceSelect(modalSelectOptions, languageSelectWindow);
    openModal(modalStart);
    outputText(selectedLang);
});

continueBtn.addEventListener('click', ()=>{
    closeModal(modalContinue);
});

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