import{
    insertAdjacent,
    mainTextarea,
    mainText
} from "./index.js";

import {
    textOutput
} from "./start-functions.js";

let textNumber = 0;

/* Функция вывода текста */

let currentTextArr = [];

function outputText(textArray){
    mainText.innerHTML = '';
    mainTextarea.value = '';

    textNumber = Math.floor(Math.random() * (textArray.length));

    if(textOutput){
        textOutput.clearTextInterval();
    }

    let text = textArray[textNumber].split(' ');

    currentTextArr = [];
    for(let word of text){
        currentTextArr.push(word);
        currentTextArr.push(' ');
    }

    for(let i = 0; i < currentTextArr.length-1; i++){
        if(i===0){
            insertAdjacent(mainText, 'beforeend', `<span class='text-active'>${currentTextArr[0]}</span>`);
        }
        else{
            insertAdjacent(mainText, 'beforeend', `<span class='text-default'>${currentTextArr[i]}</span>`);

        }
    }

}

export{
    outputText,
    textOutput,
    currentTextArr
}