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

                if(lastKey === 'Space'){
                    if(!(document.querySelector('.text-error')) && text.innerHTML === ' '){
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
                else{
                    console.log(false);
                    mainTextarea.classList.remove('left-spaces-error');
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
    mainTextarea.focus();

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
