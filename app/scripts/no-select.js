const mainText = document.getElementById('main-text');

mainText.ondragstart = noselect;
// запрет на перетаскивание
mainText.onselectstart = noselect;
// запрет на выделение элементов страницы
mainText.oncontextmenu = noselect;

function noselect() {
    return false;

}