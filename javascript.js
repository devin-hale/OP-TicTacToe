// Gameboard Module
const gameBoard = (() => {
    let gameArray = [{value: '', written: false},{value: '', written: false},{value: '', written: false},
        {value: '', written: false},{value: '', written: false},{value: '', written: false},
        {value: '', written: false},{value: '', written: false},{value: '', written: false},];

    const getArray = () => gameArray;

    const writeArray = (index, value, written) => {
        gameArray[index].value = value;
        gameArray[index].written = written;
    }
    
    const generate = () => {
        let gbDiv = document.getElementById('gameBoard');
        gameArray.forEach((item, index) => {
            let gameSquare = document.createElement('div');
            gameSquare.classList.add('gameBoardDiv');
            gameSquare.innerHTML = item.value;
            gbDiv.appendChild(gameSquare);
        })
    }

    return {getArray, writeArray, generate};
})();

gameBoard.writeArray(2, 'X', true);
gameBoard.generate();