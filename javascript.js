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
    
    return {getArray, writeArray};
})();

console.log(gameBoard.getArray());
gameBoard.writeArray(1, 'X', true);
console.log(gameBoard.getArray());