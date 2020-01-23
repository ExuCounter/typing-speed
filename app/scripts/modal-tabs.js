import {
    modalStart,
    newTextStart,
    modalEnd,
    modalContinue
} from "./index.js";

import {
    outputText
} from './output-text.js';

import {
    closeModal,
    openModal
} from './modal.js'

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
    if(modalEnd.classList.contains('d-flex')) {
        if (event.code === 'Space' || event.code === 'Enter') {
            let selectedLang = eval((languageSelectModal.value).slice(0, 3).toLowerCase() + 'TextArray');
            event.preventDefault();
            closeModal(modalEnd);
            openModal(modalStart);
            outputText(selectedLang);
        }
    }

});