const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

//håller koll på vad karaktären har gjort och har med sig
let state = {}

// startar spelet, sätter igång applicationen där den ska börja
function startGame() {
    state = {}
    showTextNode(1)
}
// Visar vilket val vi är på
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  // loop för att ta bort knapparna
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }
// sätta tillbaka knapparna utifrån våra val
  textNode.options.forEach(option => {
      if (showOption(option)) {
          const button = document.createElement('button')
          button.innerText = option.text
          button.classList.add('btn')
          button.addEventListener('click', () => selectOption(option))
          optionButtonsElement.appendChild(button)
      }
  })
}

function showOption(option) {
    return true
}
//En funktion som körs varje gång vi ska gör ett val
function selectOption(option) {

}

// Texten som skall visas
const textNodes = [
    {
        id: 1,
        text: 'After a real good night out with the lads you wake up in your bed next to your sleeping wife. Your head is killing you, and yore mouth is dry as a desert. There´s some asperin in the bedside drawer',
        options: [
            {
                text: 'Take the pills',
                setState: { pills: true},
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
        text: ' You silently try to get out of bed without waking the beast sleeping next to you. You go out to the kitchen to get yourself a glass of water',
        options: [
            {
                text: 'Drink water and use painkiller',
                requiredState: (currentState) => currentState.pills,
                setState: {pills = false, noHeadache = true, noThirst = true} ,
                nextText: 3
            }
            {
                text: 'Drink water',
                setState: {noThirst = true},
                nextText: 3
            }
            {
                text: 'go back to bed',
                nextText: 4
            }
        ]
    }
]

//körs när sidan laddats
startGame()