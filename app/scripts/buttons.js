import {
    ukrTextArray,
    rusTextArray,
    engTextArray
} from "./dataArrays.js";

import {
    newTextStart,
    outputText
} from "./index";

const languageSelect = document.getElementById('language-select');
const tryAgainBtn = document.getElementById('try-again');
const buttonStart = document.querySelector('.button');

// tryAgainBtn.addEventListener('click', ()=>{
//     let selectedLang = eval((languageSelect.value).slice(0, 3).toLowerCase() + 'TextArray');
//     newTextStart();
//     outputText(selectedLang);
// });
//
// languageSelect.addEventListener('change', ()=>{
//     let selectedLang = eval((languageSelect.value).slice(0, 3).toLowerCase() + 'TextArray');
//     newTextStart();
//     outputText(selectedLang);
// });
//
// buttonStart.addEventListener('click', ()=>{
//     newTextStart();
// });
