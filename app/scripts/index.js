const mainText = document.getElementById('main-text');
const mainTextarea = document.getElementById('main-textarea');
const speedNumber = document.getElementById('speed-number');

mainText.ondragstart = noselect;
// запрет на перетаскивание
mainText.onselectstart = noselect;
// запрет на выделение элементов страницы
mainText.oncontextmenu = noselect;

function noselect() {
    return false;
}

let textArray = [
    'Але, щоб ви зрозуміли, звідки виникає це хибне уявлення людей, цуратись насолоди і вихваляти страждання, я розкрию перед вами всю картину і роз’ясню, що саме говорив цей чоловік, який відкрив істину, якого я б назвав зодчим щасливого життя',
    'Але, ми цураємось і вважаємо, що заслуговують справедливого обурення ті, хто, піддався звабі і розбещеним спокусам, які дають їм насолоду, і без тями від пристрасті не передбачили, яких страждань і які нещастя на них чекають. Вони винні так само, як і ті, хто через душевну слабкість, тобто через бажання уникнути страждань і болю відмовляється від виконання свого обов’язку.',
    'Втім, тут дуже легко і просто провести відмінності, тому що, коли ми вільні і нам надана повна можливість вибору бажаного, коли ніщо не заважає нам робити те, що нам більше подобається, будь яку насолоду слід визнати бажаним, а будь-яке страждання огидним. Але при деяких обставинах – або на вимогу боргу, або в силу якоїсь необхідності часто доводиться забувати про насолоди і не втікати від тягарів. Тому мудрець дотримується в цьому випадку наступного принципу вибору – або, відмовляючись від задоволення, він отримує якісь інші і навіть'
];

function insertAdjacent(element, where, html) {
    return element.insertAdjacentHTML(where, html);

}

function calcSpeed(){
    let speedCounter = 0;
    let time = 1;
    setInterval(()=>(time++), 1000);
    mainTextarea.addEventListener('keydown', ()=>{
        speedCounter++;
    });
    setInterval(()=>{speedNumber.innerHTML = `${Math.ceil((speedCounter*60)/time)}`}, 1000);

}

// 600/1min
//
// 200/20sec  200*6/2
//
// 100/10sec  100*60/10
//
// 10/1sec    10*60/1
//
// 1 min

calcSpeed();

    mainTextarea.addEventListener('input', ()=>{
        let activeText = document.getElementsByClassName('text-active');
        for(let text of activeText){
            let mainTextareaArray = mainTextarea.value.split('');
            let lastWord = mainTextareaArray[mainTextareaArray.length-1];
            if(text.innerHTML.endsWith(lastWord)){
                let sibling = text.nextSibling;
                text.classList.add('text-done');
                text.classList.remove('text-active');
                sibling.classList.add('text-active');

            }

        }

    });



function outputText(textArray){
    let textNumber = Math.floor(Math.random() * (textArray.length));

    let text = textArray[1].split(' ');

    for(let span of text){
        if(span === text[0]){
            insertAdjacent(mainText, 'beforeend', `<span class='text-active'>${span}</span>`);
            insertAdjacent(mainText, 'beforeend', `<span class='text-default'> </span>`)

        }
        else{
            insertAdjacent(mainText, 'beforeend', `<span class='text-default'>${span}</span>`);
            insertAdjacent(mainText, 'beforeend', `<span class='text-default'> </span>`);

        }

    }

}

outputText(textArray);;