import {
    ukrTextArray,
    rusTextArray,
    engTextArray
} from "./dataArrays.js";

import {
    languageSelectModal,
    modalStart,
    modalEnd,
    modalContinue
} from "./index.js";

import {
    newTextStart
} from './start-functions.js';

import {
    outputText
} from './output-text.js';

import {
    closeModal,
    openModal
} from './modal.js'

const tryAgainBtn = document.getElementById('try-again');
const buttonStart = document.querySelector('.start-btn');
const continueBtn = document.querySelector('.continue-btn');
const modalEndRestartBtn = document.querySelector('.end-btn');
let selectedLang = null;

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
    selectedLang = eval((languageSelectModal.value).slice(0, 3).toLowerCase() + 'TextArray');
    openModal(modalStart);
    outputText(selectedLang);
});

continueBtn.addEventListener('click', ()=>{
    closeModal(modalContinue);
});

modalEndRestartBtn.addEventListener('click', ()=>{
    selectedLang = eval((languageSelectModal.value).slice(0, 3).toLowerCase() + 'TextArray');
    openModal(modalStart);
    closeModal(modalEnd);
    outputText(selectedLang);
});

export {
    selectedLang
}

