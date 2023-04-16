import React from 'react'

//to help bot make random move 
//eventually will be implementing AI methods here
//or different file
const RandomLogic = (setBoard, checkForWin, player, setPlayer, board) => {
    //copies current board state into a newBoard
    const newBoard = [...board];

    //selects a random value in the board
    let rowIndex = Math.floor(Math.random() * 3);
    let columnIndex = Math.floor(Math.random() * 3);

    //however if it isn't a null board state then keep choosing
    //a random spot in the board until the value is null
    while (newBoard[rowIndex][columnIndex] !== null) {
        rowIndex = Math.floor(Math.random() * 3);
        columnIndex = Math.floor(Math.random() * 3);
    }

    //we adjust the state to have the bot's color in it
    newBoard[rowIndex][columnIndex] = 'blue';

    //sets theboard to the updated board
    setBoard(newBoard);

    if (checkForWin(newBoard, player)) {
        console.log(`${player} wins!`);
    } else {
        setPlayer(player === 'red' ? 'blue' : 'red');
    }
    // //changes player to us the human
    // setPlayer('red');
};

export default RandomLogic