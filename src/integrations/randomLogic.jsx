import React from 'react'
import defeatFX from '../assets/lost_vs_bot.mp3'

//to help bot make random move 
//eventually will be implementing minimax here
//or different file

// setBoard, checkForWin, player, setPlayer, board, setWinner, playerPiecesRef.current
const RandomLogic = (setBoard, checkForWin, player, setPlayer, board, setWinner, playerPieces) => {

    //copies current board state into a newBoard
    const newBoard = [...board];
    
    const defeatSound = () => {
        new Audio(defeatFX).play()
    }

    //selects a random value in the board
    let rowIndex = Math.floor(Math.random() * 3);
    let columnIndex = Math.floor(Math.random() * 3);

    console.log(`PLAYER PIECES: ${playerPieces}`)

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

            //think about implementing something similar to this for the actions function

            //represent action as a 4-tuple
            //example action (1, 1, 0, 0)
            //take middle piece and move it to top left
            //x x o
            //x - o
            //- o -
            //[ (0,1,1,1), (1,0,2,0), (1,0,1,1), (0,0,1,1) ] --- possible moves


            //[ (-1,-1, 0,0)] could possibly represent bringing in a new piece to 0,0

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
    if (playerPieces.length < 3 ) {
        while (newBoard[rowIndex][columnIndex] !== null) {
            rowIndex = Math.floor(Math.random() * 3);
            columnIndex = Math.floor(Math.random() * 3);
        }

        //we adjust the state to have the bot's color in it
        newBoard[rowIndex][columnIndex] = 'blue';
        console.log(`Bot pieces amount: ${playerPieces.length}`)
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

    //sets theboard to the updated board
    setBoard(newBoard);

    if (checkForWin(newBoard, player)) {
        console.log(`${player} wins!`);
        setWinner(player)
        defeatSound()
    } else {
        setPlayer(player === 'red' ? 'blue' : 'red');
    }

}

export default RandomLogic