const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')

let score = document.querySelector('#score')
let result = 0
let currentTime = timeLeft.textContent
let randomPosition = null
let hitSquare = null

function randomSquare() {
    // Removes mole from all of the square divs
    square.forEach(className => {
        className.classList.remove('mole')
    })
    // Generate random square to populate
    randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')

    hitSquare = randomPosition.id
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if(id.id === hitSquare) {
            randomPosition.classList.remove('mole')
            result += 1
            score.textContent = result
            hitSquare = 0
        }
    })
})

let timerId01 = null
let timerId02 = null

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if(currentTime === 0) {
        clearInterval(timerId01)
        clearInterval(timerId02)
        alert('Game Over! Your score is: ' + result)
    }
}

function moveMole() {
    timerId01 = setInterval(randomSquare, 1600)
    timerId02 = setInterval(countDown, 1000)
}

moveMole()