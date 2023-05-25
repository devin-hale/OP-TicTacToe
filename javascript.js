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
                } else if(playerChoice === playerTurn){
                    a.target.innerHTML = playerChoice
                    a.target.dataset.value = playerChoice
                    a.target.dataset.written = true
                    a.target.classList.remove('unwritten');
                    gameBoard.writeArray(a.target.id, playerChoice, true);
                    controller.winChecker(a);
                    playerTurn = player2Choice
                    console.log(playerTurn)
                    console.log(player2Choice)
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
        let currentPlayer = document.createElement('div');
        currentPlayer.classList = 'player';
        currentPlayer.id = 'currentPlayer';
        currentPlayer.innerHTML = '<';
        controllerDiv.appendChild(currentPlayer);
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
                if (gameArray[targPos+3].value == gameArray[targPos].value && gameArray[targPos+6].value == gameArray[targPos].value) {winReached = true; victor = playerTurn};
                break;
            case [3,4,5].includes(targPos):
                if (gameArray[targPos-3].value == gameArray[targPos].value && gameArray[targPos+3].value == gameArray[targPos].value) {winReached = true; victor = playerTurn};
                break;
            case [6,7,8].includes(targPos):
                if (gameArray[targPos-3].value == gameArray[targPos].value && gameArray[targPos-6].value == gameArray[targPos].value) {winReached = true; victor = playerTurn};
                break;
        };
    };
    // Checks for horizontal wins based on checkers
    const horizontalWC = (targPos, gameArray) => {
        switch (true) {
            case [0,3,6].includes(targPos):
                if (gameArray[targPos+1].value == gameArray[targPos].value && gameArray[targPos+2].value == gameArray[targPos].value) {winReached = true; victor = playerTurn};
                break;
            case [1,4,7].includes(targPos):
                if (gameArray[targPos-1].value == gameArray[targPos].value && gameArray[targPos+1].value == gameArray[targPos].value) {winReached = true; victor = playerTurn};
                break;
            case [2,5,8].includes(targPos):
                if (gameArray[targPos-2].value == gameArray[targPos].value && gameArray[targPos-1].value == gameArray[targPos].value) {winReached = true; victor = playerTurn};
                break;
        };
    };
    // Checks for Diagonal Wins based on Position
    const diagWC = (targPos, gameArray) => {
        switch(true) {
            case targPos == 0:
                if (gameArray[targPos+4].value == gameArray[targPos].value && gameArray[targPos+8].value == gameArray[targPos].value) {winReached = true; victor = playerTurn};
                break;
            case targPos == 2:
                if (gameArray[targPos+2].value == gameArray[targPos].value && gameArray[targPos+6].value == gameArray[targPos].value) {winReached = true; victor = playerTurn};
                break;
            case targPos == 4:
                if (gameArray[targPos-2].value == gameArray[targPos].value && gameArray[targPos+2].value == gameArray[targPos].value) {
                    winReached = true;
                    victor = playerTurn;
                    break;
                }
                if (gameArray[targPos-4].value == gameArray[targPos].value && gameArray[targPos+4].value == gameArray[targPos].value) {
                    winReached = true;
                    victor = playerTurn;
                    break
                }
            case targPos == 6:
                if (gameArray[targPos-2].value == gameArray[targPos].value && gameArray[targPos-4].value == gameArray[targPos].value) {winReached = true; victor = playerTurn};
                break;
            case targPos == 8:
                if (gameArray[targPos-4].value == gameArray[targPos].value && gameArray[targPos-8].value == gameArray[targPos].value) {winReached = true; victor = playerTurn};
                break;

        };
    };

    //Win Checker.  Combines the three functions above.
    const winChecker = (a) => {
        let gameArray = gameBoard.getArray();
        let targPos = Number(a.target.id)
        verticalWC(targPos, gameArray);
        horizontalWC(targPos, gameArray);
        diagWC(targPos, gameArray);
    }

    const modal = () => {
        let modalBKG = document.createElement('div');
        modalBKG.classList = 'modal'
        modalBKG.id = 'modal';
        let modalWindow = document.createElement('div');
        modalWindow.id = 'modal-window'
        modalBKG.appendChild(modalWindow);
        document.body.appendChild(modalBKG);
        
    }

    const choosePlayer = () => {
        modal();
        let modalBKG = document.getElementById('modal-window');
        let choosePlayer = document.createElement('div');
        choosePlayer.classList = 'choiceText';
        choosePlayer.innerHTML = 'Make Your Choice:';
        modalBKG.appendChild(choosePlayer);
        let chooseX = document.createElement('div');
        chooseX.classList = 'choose';
        chooseX.id = 'chooseX'
        chooseX.innerHTML = 'X';
        modalBKG.appendChild(chooseX);
        let chooseO = document.createElement('div');
        chooseO.classList = 'choose';
        chooseO.innerHTML = 'O';
        chooseO.id = 'chooseO'
        modalBKG.appendChild(chooseO);

        document.getElementById('chooseO').addEventListener('click', () => {
            playerChoice = 'O';
            player2Choice = 'X';
            document.getElementById('modal').remove();
        });

        document.getElementById('chooseX').addEventListener('click', () => {
            playerChoice = 'X';
            player2Choice = 'O';
            document.getElementById('modal').remove();
        });


    }


    return {initialize, winChecker, choosePlayer}
})();

let playerChoice = '';
let player2Choice = '';
let playerTurn = 'X';
let winReached = false;
let victor;

// Initializing Stuff
gameBoard.generate();
controller.initialize();
controller.choosePlayer();
