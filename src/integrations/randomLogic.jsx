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

<<<<<<< Updated upstream
    //however if it isn't a null board state then keep choosing
    //a random spot in the board until the value is null
    while (newBoard[rowIndex][columnIndex] !== null) {
        rowIndex = Math.floor(Math.random() * 3);
        columnIndex = Math.floor(Math.random() * 3);
    }

    //we adjust the state to have the bot's color in it
    newBoard[rowIndex][columnIndex] = 'blue';
=======
    function movePiece(validChoices, pieceToMove) {
        let emptyValidChoices = [];
        for (let i = 0; i < validChoices.length; i++) {
            let coords = validChoices[i];
            if (newBoard[coords[0]][coords[1]] === null) {
                emptyValidChoices.push(coords);
            }
        }

        while (emptyValidChoices.length === 0) {
            // If there are no empty valid choices, choose a new random piece to move
            pieceToMove = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
            validChoices = validChoicesForPiece = validChoices[pieceToMove[0]][pieceToMove[1]];
            emptyValidChoices = [];
            for (let i = 0; i < validChoices.length; i++) {
                let coords = validChoices[i];
                if (newBoard[coords[0]][coords[1]] === null) {
                    emptyValidChoices.push(coords);
                }
            }
        }

        let index = Math.floor(Math.random() * emptyValidChoices.length);
        let newCoords = emptyValidChoices[index];
        newBoard[newCoords[0]][newCoords[1]] = 'blue';
        console.log(`newBoard[newCoords]: ${newBoard[newCoords[0]][newCoords[1]]}`)
        newBoard[pieceToMove[0]][pieceToMove[1]] = null;
        console.log(`newBoard[newCoords]: ${newBoard[pieceToMove[0]][pieceToMove[1]]}`)
    }

    //however if it isn't a null board state then keep choosing
    //a random spot in the board until the value is null
    if (playerPieces.length < 3) {
        while (newBoard[rowIndex][columnIndex] !== null) {
            rowIndex = Math.floor(Math.random() * 3);
            columnIndex = Math.floor(Math.random() * 3);
        }

        //we adjust the state to have the bot's color in it
        newBoard[rowIndex][columnIndex] = 'blue';
        console.log(`Bot pieces amount: ${playerPieces.length + 1}`)
    }
    else if (playerPieces.length === 3) {
        console.log('BLUE HAS REACHED MAX PIECES')

        //choose a random blue piece that exists on the board
        //so we store all blue pieces
        let blueCoords = []

        for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < newBoard[i].length; j++) {
                if (newBoard[i][j] === 'blue') blueCoords.push([i, j])
            }
        }

        console.log(`Blue pieces: ${blueCoords}`)

        const pieceToMove = blueCoords[Math.floor(Math.random() * blueCoords.length)]

        const validChoices = [
            [
                [[0, 1], [1, 0], [1, 1]], // row 0, column 0
                [[0, 0], [1, 1], [0, 2]], // row 0, column 1
                [[0, 1], [1, 1], [1, 2]]  // row 0, column 2
            ],
            [
                [[0, 0], [1, 1], [2, 0]], // row 1, column 0
                [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]], // row 1, column 1
                [[0, 2], [1, 1], [2, 2]]  // row 1, column 2
            ],
            [
                [[1, 0], [1, 1], [2, 1]], // row 2, column 0
                [[2, 0], [1, 1], [2, 2]], // row 2, column 1
                [[2, 1], [1, 1], [1, 2]]  // row 2, column 2
            ]
        ];

        const validChoicesForPiece = validChoices[pieceToMove[0]][pieceToMove[1]];
        movePiece(validChoicesForPiece, pieceToMove);


    }
>>>>>>> Stashed changes

    //sets theboard to the updated board
    setBoard(newBoard);

    if (checkForWin(newBoard, player)) {
        console.log(`${player} wins!`);
    } else {
        setPlayer(player === 'red' ? 'blue' : 'red');
    }
<<<<<<< Updated upstream
    // //changes player to us the human
    // setPlayer('red');
};
=======

}
>>>>>>> Stashed changes

export default RandomLogic