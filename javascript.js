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
        gameArray.forEach((item) => {
            let gameSquare = document.createElement('div');
            gameSquare.classList.add('gameBoardDiv');
            gameSquare.classList.add('unwritten')
            gameSquare.dataset.value = item.value
            gameSquare.dataset.written = item.written
            gameSquare.innerHTML = item.value;
            gbDiv.appendChild(gameSquare);
            gameSquare.addEventListener('click', a => {
                if (item.written == true) {
                } else {
                    a.target.innerHTML = 'X'
                    a.target.dataset.value = 'X'
                    a.target.dataset.written = true
                    a.target.classList.remove('unwritten');
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

gameBoard.generate();
document.getElementById('resetButton').addEventListener('click', () => gameBoard.erase());