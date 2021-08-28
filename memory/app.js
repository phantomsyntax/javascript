document.addEventListener('DOMContentLoaded', () => {
    // Available cards to pick from
    const cardArray = [
        {
            name: 'X',
            img: 'images/x.png'
        },
        {
            name: 'X',
            img: 'images/x.png'
        },
        {
            name: 'Y',
            img: 'images/y.png'
        },
        {
            name: 'Y',
            img: 'images/y.png'
        },
        {
            name: 'Z',
            img: 'images/z.png'
        },
        {
            name: 'Z',
            img: 'images/z.png'
        }
    ]
    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid') // Assigns the grid element
    const result = document.querySelector('#result') // Assigns the result element
    var cardsSelected =[] // Holds the two cards chosen each round
    var cardsSelectedId = [] // Holds the ID of the two cards chosen each round
    var cardsMatched = [] // Holds the number of cards that have been matched

    function createGameBoard() {
        for(let cardIndex = 0; cardIndex < cardArray.length; cardIndex++) {
            // Creates each card in the array and loads the back image
            var card = document.createElement('img')
            card.setAttribute('src', 'images/back.png')
            card.setAttribute('data-id', cardIndex)
            card.addEventListener('click', flipCard)
            // Sets the card as a child of grid
            grid.appendChild(card)
        }
    }

    function checkForMatch(){
        var cards = document.querySelectorAll('img')
        const cardOneId = cardsSelectedId[0]
        const cardTwoId = cardsSelectedId[1]
        if(cardsSelected[0] === cardsSelected[1]) {
            alert('You found a match!')
            cards[cardOneId].setAttribute('src', 'images/blank.png')
            cards[cardTwoId].setAttribute('src', 'images/blank.png')
            cardsMatched.push(cardsSelected)
        } else {
            alert('Sorry, try again!')
            cards[cardOneId].setAttribute('src', 'images/back.png')
            cards[cardTwoId].setAttribute('src', 'images/back.png')
        }
        cardsSelected = []
        cardsSelectedId = []

        result.textContent = cardsMatched.length
        if (cardsMatched.length === cardArray.length / 2){
            result.textContent = 'Congratulations! You found all the matches!'
        }
    }

    function flipCard() {
        var cardId = this.getAttribute('data-id')
        cardsSelected.push(cardArray[cardId].name)
        cardsSelectedId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)

        if(cardsSelected.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createGameBoard()
})