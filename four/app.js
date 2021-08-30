document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const result = document.querySelector('#result');
    const displayCurrentPlayer = document.querySelector('#current-player');
    
    let currentPlayer = 1;

    const winningArrays = [
        [0, 1, 2, 3],
        [41, 40, 39, 38],
        [7, 8, 9, 10],
        [34, 33, 32, 31],
        [14, 15, 16, 17],
        [27, 26, 25, 24],
        [21, 22, 23, 24],
        [20, 19, 18, 17],
        [28, 29, 30, 31],
        [13, 12, 11, 10],
        [35, 36, 37, 38],
        [6, 5, 4, 3],
        [0, 7, 14, 21],
        [41, 34, 27, 20],
        [1, 8, 15, 22],
        [40, 33, 26, 19],
        [2, 9, 16, 23],
        [39, 32, 25, 18],
        [3, 10, 17, 24],
        [38, 31, 24, 17],
        [4, 11, 18, 25],
        [37, 30, 23, 16],
        [5, 12, 19, 26],
        [36, 29, 22, 15],
        [6, 13, 20, 27],
        [35, 28, 21, 14],
        [0, 8, 16, 24],
        [41, 33, 25, 17],
        [7, 15, 23, 31],
        [34, 26, 18, 10],
        [14, 22, 30, 38],
        [27, 19, 11, 3],
        [35, 29, 23, 17],
        [6, 12, 18, 24],
        [28, 22, 16, 10],
        [13, 19, 25, 31],
        [21, 15, 9, 3],
        [20, 26, 32, 38],
        [36, 30, 24, 18],
        [5, 11, 17, 23],
        [37, 31, 25, 19],
        [4, 10, 16, 22],
        [2, 10, 18, 26],
        [39, 31, 23, 15],
        [1, 9, 17, 25],
        [40, 32, 24, 16],
        [9, 17, 25, 33],
        [8, 16, 24, 32],
        [11, 17, 23, 29],
        [12, 18, 24, 30],
        [1, 2, 3, 4],
        [5, 4, 3, 2],
        [8, 9, 10, 11],
        [12, 11, 10, 9],
        [15, 16, 17, 18],
        [19, 18, 17, 16],
        [22, 23, 24, 25],
        [26, 25, 24, 23],
        [29, 30, 31, 32],
        [33, 32, 31, 30],
        [36, 37, 38, 39],
        [40, 39, 38, 37],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 16, 23, 30],
        [10, 17, 24, 31],
        [11, 18, 25, 32],
        [12, 19, 26, 33],
        [13, 20, 27, 34]
    ]

    function fillSquare(id) {
        if(currentPlayer === 1) {
            squares[id].classList.add('player-one');
            currentPlayer = 2;
        } else if (currentPlayer === 2) {
            squares[id].classList.add('player-two');
            currentPlayer = 1;
        }
    }

    function checkSquare(squareId){
        let id = parseInt(squareId);
        let screaming = id + 7;
        // Check to see if the square has already been filled
        if(squares[id].classList.contains('taken')) return;
        // See if the squareId + 7 has 'taken' tag
        if(squares[screaming].classList.contains('taken')){
            squares[id].classList.add('taken');
            fillSquare(id)
        } else alert('You can not choose this square!');
        displayCurrentPlayer.innerHTML = currentPlayer;
    }

    function gameOver() {
        squares.forEach(square => {
            squares[square.id].classList.add('taken');
            square.removeEventListener('click', checkForWin);
        });
        alert('Game Over!');
    }

    function checkForWin(){
        let p1Counter = 0;
        let p2Counter = 0;
        winningArrays.forEach(array => {
            // Check each number in the array to see if it has player-one or player-two in classList
            for(let index = 0; index < 4; index++) {
                if(squares[array[index]].classList.contains('player-one')) p1Counter++;
                if(squares[array[index]].classList.contains('player-two')) p2Counter++;
                // If counter reaches 4, return player has won
                // TODO: build a gameOver function that clears the eventlisteners
                if(p1Counter === 4) {
                    result.innerHTML = 'Player 1 has won!';
                    gameOver();
                    break;
                }
                if(p2Counter === 4) {
                    result.innerHTML = 'Player 2 has won!';
                    gameOver();
                    break;
                }
            }
            p1Counter = 0;
            p2Counter = 0;
        });
    }

    squares.forEach(square => {
        square.addEventListener('click', function() {checkSquare(square.id)});
        square.addEventListener('click', checkForWin);
    });
})