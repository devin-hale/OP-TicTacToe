// Gameboard Module
const gameBoard = (() => {
    let gameArray = [{value: '', written: false},{value: '', written: false},{value: '', written: false},
        {value: '', written: false},{value: '', written: false},{value: '', written: false},
        {value: '', written: false},{value: '', written: false},{value: '', written: false},];

    const getArray = () => gameArray;
    
    return {getArray};
})