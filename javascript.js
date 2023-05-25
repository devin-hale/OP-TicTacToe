// Gameboard Module
const gameBoard = (() => {
    let gameArray = [];

    const initializeArray = () => {
        for (i = 0; i <= 8; i++) {
            gameArray.push({value: '', written: false, position: i});
        }
    }

    const getArray = () => gameArray;

    const writeArray = (index, value, written) => {
        gameArray[index].value = value;
        gameArray[index].written = written;
    }
    
    const generate = () => {
        initializeArray();
        let gbDiv = document.getElementById('gameBoard');
        gameArray.forEach((item, index) => {
            let gameSquare = document.createElement('div');
            gameSquare.classList.add('gameBoardDiv');
            gameSquare.classList.add('unwritten')
            gameSquare.id = index
            gameSquare.dataset.value = item.value
            gameSquare.dataset.written = item.written
            gameSquare.innerHTML = item.value;
            gbDiv.appendChild(gameSquare);
            // Pretty sure this can be changed to send a promise to a cleaner function in a controller module.
            gameSquare.addEventListener('click', a => {
                if (item.written == true) {
                } else {
                    a.target.innerHTML = 'X'
                    a.target.dataset.value = 'X'
                    a.target.dataset.written = true
                    a.target.classList.remove('unwritten');
                    gameBoard.writeArray(a.target.id, 'X', true);
                    controller.winChecker(a);
                }
            }) 
        })
    }

    const erase = () => {
        Array.from(document.getElementById('gameBoard').children).forEach( (item, index) => {
            item.dataset.value = '';
            gameArray[index].value = '';
            item.dataset.written = false;
            gameArray[index].written = false;
            item.classList.add('unwritten');
            item.innerHTML = '';
        })
    }

    return {getArray, writeArray, generate, erase};
})();

//Controller Module//
const controller = (() => {
    const initialize = () => {
        let controllerDiv = document.getElementById('controller')
        let playerX = document.createElement('div');
        playerX.classList = 'player';
        playerX.id = 'playerX'
        playerX.innerHTML = 'X'
        controllerDiv.appendChild(playerX);
        let playerO = document.createElement('div');
        playerO.classList = 'player';
        playerO.id = 'playerO'
        playerO.innerHTML = 'O'
        controllerDiv.appendChild(playerO);
        document.getElementById('resetButton').setAttribute('onclick', 'gameBoard.erase()')

    }

    // Vertical Win Checker
    const verticalWC = (targPos, gameArray) => {
        switch (true) {
            case [0,1,2].includes(targPos):
                gameArray[targPos+3].value == gameArray[targPos].value && gameArray[targPos+6].value == gameArray[targPos].value ? console.log('Win') : console.log ('No win');
                break;
            case [3,4,5].includes(targPos):
                gameArray[targPos-3].value == gameArray[targPos].value && gameArray[targPos+3].value == gameArray[targPos].value ? console.log('Win') : console.log ('No win');
                break;
            case [6,7,8].includes(targPos):
                gameArray[targPos-3].value == gameArray[targPos].value && gameArray[targPos-6].value == gameArray[targPos].value ? console.log('Win') : console.log ('No win');
                break;
        };
    };
    // Checks for horizontal wins based on checkers
    const horizontalWC = (targPos, gameArray) => {
        switch (true) {
            case [0,3,6].includes(targPos):
                gameArray[targPos+1].value == gameArray[targPos].value && gameArray[targPos+2].value == gameArray[targPos].value ? console.log('Win') : console.log ('No win');
                break;
            case [1,4,7].includes(targPos):
                gameArray[targPos-1].value == gameArray[targPos].value && gameArray[targPos+1].value == gameArray[targPos].value ? console.log('Win') : console.log ('No win');
                break;
            case [2,5,8].includes(targPos):
                gameArray[targPos-2].value == gameArray[targPos].value && gameArray[targPos-1].value == gameArray[targPos].value ? console.log('Win') : console.log ('No win');
                break;
        };
    };
    // Checks for Diagonal Wins based on Position
    const diagWC = (targPos, gameArray) => {
        switch(true) {
            case targPos == 0:
                gameArray[targPos+4].value == gameArray[targPos].value && gameArray[targPos+8].value == gameArray[targPos].value ? console.log('Win') : console.log ('No win');
                break;
            case targPos == 2:
                gameArray[targPos+2].value == gameArray[targPos].value && gameArray[targPos+6].value == gameArray[targPos].value ? console.log('Win') : console.log ('No win');
                break;
            case targPos == 4:
                if (gameArray[targPos-2].value == gameArray[targPos].value && gameArray[targPos+2].value == gameArray[targPos].value) {
                    console.log('Win')
                    break;
                }
                if (gameArray[targPos-4].value == gameArray[targPos].value && gameArray[targPos+4].value == gameArray[targPos].value) {
                    console.log('Win')
                    break
                }
            case targPos == 6:
                gameArray[targPos-2].value == gameArray[targPos].value && gameArray[targPos-4].value == gameArray[targPos].value ? console.log('Win') : console.log ('No win');
                break;
            case targPos == 8:
                gameArray[targPos-4].value == gameArray[targPos].value && gameArray[targPos-8].value == gameArray[targPos].value ? console.log('Win') : console.log ('No win');
                break;

        };
    };


    const winChecker = (a) => {
        let gameArray = gameBoard.getArray();
        let targPos = Number(a.target.id)
        verticalWC(targPos, gameArray);
        horizontalWC(targPos, gameArray);
        diagWC(targPos, gameArray);
    }

    return {initialize, winChecker}
})();


// Initializing Stuff
gameBoard.generate();
controller.initialize();
