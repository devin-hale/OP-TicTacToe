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

    return {getArray, writeArray, generate};
})();

gameBoard.generate();