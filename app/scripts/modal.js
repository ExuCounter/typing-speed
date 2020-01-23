import {
    mainTextarea
} from "./index.js";

function openModal(modal) {
    modal.classList.add('d-flex');
    mainTextarea.classList.remove('textarea-error');
    mainTextarea.blur();

}

function closeModal(modal) {
    modal.classList.remove('d-flex');
    mainTextarea.focus();

}

export {
    openModal,
    closeModal
}