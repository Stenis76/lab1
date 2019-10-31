const textElement = document.getElementById('text')
const optionListItems = document.getElementById('optionlist')

//håller koll på vad karaktären har gjort och har med sig
let state = {}
let textNode;


/**
 * startar spelet, sätter igång applicationen där den ska börja
 */
function startGame() {
    state = {}
    showTextNode(1)
}
/**
 * Visar vilket val/nod vi är på i spelet
 * @param {Number} textNodeIndex 
 */
function showTextNode(textNodeIndex) {

    textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text

    // loop för att ta bort knapparna
    while (optionListItems.firstChild) {
        optionListItems.removeChild(optionListItems.firstChild)
    }
    // sätta ut alterntiv för våra val i form av en lista

    textNode.options.forEach(option => {
        // if (showOption(option)) {
        const listItem = document.createElement('li')
        listItem.innerText = option.text
        optionListItems.appendChild(listItem)
        // list.addEventListener('click', () => selectOption(option))
        // optionButtonsElement.appendChild(button)
        // }
    })
}

//En funktion som körs varje gång vi ska gör ett val
function selectOption(input) {
    const option = textNode.options.find(option => option.text.toLowerCase() === input.toLowerCase())

/**
 * @todo skriv ut felmedelande på sidan
 */
    if (!option) return

    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) return startGame()

    // state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

function inputValue() {
    console.log("hej");
    const inputElement = document.getElementById('user-input')
    let inputValue = inputElement.value

    // Om input value = 0 (dvs tom) så retunerar vi det upp i de blå (avbryter funktion) !=negation
    if (!inputValue.length) return

    inputElement.value = ''
    selectOption(inputValue)
}
// Texten som skall visas
const textNodes = [
    {
        id: 1,
        text: 'After a real good night out with the lads you wake up in your bed next to your sleeping wife. Your head is killing you, and yore mouth is dry as a desert. There´s some asperin in the bedside drawer',
        options: [
            {
                text: 'Take pills',
                setState: { pills: true },
                nextText: 2,
            },
            {
                text: 'leave them',
                nextText: 2,
            }
        ]
    },
    {
        id: 2,
        text: 'You silently try to get out of bed without waking the beast sleeping next to you. You go out to the kitchen to get yourself a glass of water',
        options: [
            {
                text: 'Drink water and use pills',
                requiredState: (currentState) => currentState.pills,
                setState: { pills: false, noHeadache: true, noThirst: true },
                nextText: 3,
            },
            {
                text: 'Drink water',
                setState: { noThirst: true },
                nextText: 3,
            },
            {
                text: 'Go to bed',
                nextText: 4,
            }
        ]
    },
    {
        id: 3,
        text: 'The world around you have started to stablize a bit, suddenly one of your kids starts to cry from the bedroom. What do you do?',
        options: [
            {
                text: 'hurry in',
                nextText: 5,
            },
            {
                text: 'hide in bathroom',
                nextText: 6,
            }
        ]

    },
    {
        id: 4,
        text: 'On youre way back to bed u feel so dizzy from the dehydration and your head feels that its going to explode, u trip and fall waking youre spouse - Youre dead',
        options: [
            {
                text: 'Restart',
                nextText: -1,
            }
        ]
    },
    {
        id: 5,
        text: 'The world around you have started to stablize a bit, suddenly one of your kids starts to cry from the bedroom. What do you do?',
        options: [
            {
                text: 'With no headache, u easily comfort the baby',
                requiredState: (currentState) => currentState.noHeadache,
                nextText: 7,
            },
            {
                text: 'U try to make the baby quite',
                nextText: 8,
            }
        ]

    },
]

/**
 * Körs när hela sidan laddats
 */
startGame()