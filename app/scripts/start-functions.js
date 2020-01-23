import {
    mainTextarea,
    Text
} from "./index.js";

let textOutput = null;

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
    textOutput.createStat(0,0, 0);

}

export{
    newTextStart,
    textOutput
}