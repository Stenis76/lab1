const textElement = document.getElementById('text')
const optionListItems = document.getElementById('optionlist')

let textNode;
/** håller koll på vad karaktären har gjort och har med sig, då jag ännu inte använder mig av 
states än så fyller den ingen funktion*/
let state = {}


/**
 * startar spelet, sätter igång applicationen där den ska börja
 */
function startGame() {
    state = {}
    showTextNode(1)
}
/**
 * Visar vilket val/nod vi är på i spelet
 * @param {Number} textNodeIndex nuvarnde textnode
 */
function showTextNode(textNodeIndex) {
    textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text

    // loop för att ta bort knapparna
    while (optionListItems.firstChild) {
        optionListItems.removeChild(optionListItems.firstChild)
    }

    
    //Sätta ut alterntiv för våra val i form av en lista
    textNode.options.forEach(option => {
        const listItem = document.createElement('li')
        listItem.innerText = option.text
        optionListItems.appendChild(listItem)
        // Denna kod behövs för att fixa olika states, men gör detta i vers2
        // if (showOption(option)) {
        // list.addEventListener('click', () => selectOption(option))
        // optionButtonsElement.appendChild(button)
        // }
    })
}


/**
 * En funktion som körs varje gång vi ska gör ett val (frågan e om)
 * @param {string} input beskrivning
 */
function selectOption(input) {
    const option = textNode.options.find(option => option.text.toLowerCase() === input.toLowerCase())

    /**
     * @todo skriv ut felmedelande på sidan
     */
    if (!option) return

    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) return startGame()
    // Använder mig av state i version 2
    // state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}
/**
 * 
 */
function inputValue() {
    const inputElement = document.getElementById('user-input')
    let inputValue = inputElement.value

    // Om input value = 0 (dvs tom) så retunerar vi det upp i de blå (avbryter funktion) !=negation
    if (!inputValue.length) return

    inputElement.value = ''
    selectOption(inputValue)
}

/**
 * Valmöjlighter i varje GameNode
 * @typedef {{text:string, nextText:number} GameNodeOption
 */

/**
 * En nod som beskriver spelets olika steg samt valmöjlighter
 * @typedef {{id:number, text:string, option: Array<GameNodeOption>}} GameNode
 */

/**
 * Texten som skall visas samt val för spelet
 * @type {Array<GameNode>} 
 */
const textNodes = [
    {
        id: 1,
        text: `After a real good night out with the lads you wake up in your bed next to your sleeping wife. Your head is killing you, and yore mouth is dry as a desert. There´s some pills in the bedside drawer`,
        options: [
            {
                text: 'Take pills',
                // setState: { pills: true },
                nextText: 6,
            },
            {
                text: 'Leave them',
                nextText: 2,
            }
        ]
    },
    {
        id: 2,
        text: 'You silently try to get out of bed without waking the beast sleeping next to you. You go out to the kitchen to get yourself a glass of water',
        options: [
            // {
            //     text: 'Drink water and use pills',
            //     requiredState: (currentState) => currentState.pills,
            //     setState: { pills: false, noHeadache: true, noThirst: true },
            //     nextText: 3,
            // },
            {
                text: 'Drink water from tap',
                // setState: { noThirst: true },
                nextText: 7,
            },
            {
                text: 'Pour a glas of water',
                // setState: { noThirst: true },
                nextText: 3,
            },
            {
                text: 'Go back to bed',
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
                nextText: 8,
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
        text: 'The baby screaming and you know if he wakes upp the house youre going to be the one too suffer, What do you do?',
        options: [
            // {
            //     text: 'With no headache, u easily comfort the baby',
            //     requiredState: (currentState) => currentState.noHeadache,
            //     nextText: 7,
            // },
            {
                text: 'U try to make the baby silent with a song',
                nextText: 9,
            },
            {
                text: 'U try to make the baby silent with a pillow',
                nextText: 10,
            }
        ]

    },
    {
        id: 6,
        text: 'You swallow the pills without checking the label'
            + 'why on earth would someone store cyanidpills in there bedside drawer.. Youre dead!',
        options: [
            {
                text: 'Restart',
                nextText: -1,
            }
        ]
    },
    {
        id: 7,
        text: 'You drink the water from the tap, but its hot instead of cold.. you burn your mouth and scream and you wake the whole family.. Now u wish you were dead!',
        options: [
            {
                text: 'Restart',
                nextText: -1,
            }
        ]
    },
    {
        id: 8,
        text: 'You hide in the bathroom and you hear the heavy steps of youre spouse going to the nursery, you know that this wont end well so u take your life - Youre dead',
        options: [
            {
                text: 'Restart',
                nextText: -1,
            }
        ]
    },
    {
        id: 9,
        text: 'You sing a lullaby and the baby falls asleep, what do u do now? You still got one hell of a headache and you should probably get some more water in your system',
        options: [
            {
                text: 'Make breakfast',
                nextText: 11,
            },
            {
                text: 'Get pills from bedroom',
                nextText: 6,
            },
            {
                text: 'Fuck it - go to bed',
                nextText: 4,
            }

        ]
    },
    {
        id: 10,
        text: 'You sick fuck, thats murder.. no more playing for u!!',
        options: [
            //kanske lägga in en infinte loop så webläsaren låser sig XD
            {
                text: 'Restart',
                nextText: -1,
            }
        ]
    },
    {
        id: 11,
        text: 'You make a real good breakfast, with egg and bacon, black coffe and some orange juice.',
        options: [
            {
                text: 'Give it wife in bed',
                nextText: 12,
            },
            {
                text: 'Eat it',
                nextText: 13,
            }
        ]
    },
    {
        id: 12,
        text: 'You know what they say - happy wife, happy life! Congrats you survived',
        options: [
            {
                text: 'Restart',
                nextText: -1,
            }
        ]
    },
    {
        id: 13,
        text: 'You eat the breakfast and you feel that youre life is comming back to u.. But then it happens youre wife wakes up hungry and theres no food left.. Youre dead!',
        options: [
            {
                text: 'Restart',
                nextText: -1,
            }
        ]
    },
]

/**
 * Körs när hela sidan laddats
 */
startGame()