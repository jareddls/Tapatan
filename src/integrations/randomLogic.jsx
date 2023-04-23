import React from 'react'

//to help bot make random move 
//eventually will be implementing AI methods here
//or different file
const RandomLogic = (setBoard, checkForWin, player, setPlayer, board, setWinner, playerPieces) => {
    //copies current board state into a newBoard
    const newBoard = [...board];

    //selects a random value in the board

    let rowIndex = Math.floor(Math.random() * 3);
    let columnIndex = Math.floor(Math.random() * 3);

    function movePiece(validChoices, pieceToMove) {
        let index = Math.floor(Math.random() * validChoices.length);
        let newCoords = validChoices[index];
        while (newBoard[newCoords[0]][newCoords[1]] !== null) {
            index = Math.floor(Math.random() * validChoices.length);
            newCoords = validChoices[index];
        }
        newBoard[newCoords[0]][newCoords[1]] = 'blue';
        newBoard[pieceToMove[0]][pieceToMove[1]] = null;
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
        console.log(playerPieces.length)
    }
    else if (playerPieces.length === 3) {
        console.log('this runs')
        let blueCoords = []
        for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < i.length; j++) {
                if (newBoard[i][j] === 'blue') blueCoords.push([i, j])
            }
        }

        const pieceToMove = blueCoords[Math.floor(Math.random() * blueCoords.length)]
        
        //while the piece that is chosen doesn't have any red pieces around it?
        //else statement to reselect piece if blue piece is surrounded by red piece
        if (pieceToMove[0] === 0 && pieceToMove[1] === 0) {
            const validChoices = [[0, 1], [1, 0], [1, 1]]
            movePiece(validChoices, pieceToMove)
        }
        else if (pieceToMove[0] === 0 && pieceToMove[1] === 1) {
            const validChoices = [[0, 0], [1, 1], [0, 2]]
            movePiece(validChoices, pieceToMove)
        }
        else if (pieceToMove[0] === 0 && pieceToMove[1] === 2) {
            const validChoices = [[0, 1], [1, 1], [1, 2]]
            movePiece(validChoices, pieceToMove)
        }
        else if (pieceToMove[0] === 1 && pieceToMove[1] === 0) {
            const validChoices = [[0, 0], [1, 1], [2, 1]]
            movePiece(validChoices, pieceToMove)
        }
        else if (pieceToMove[0] === 1 && pieceToMove[1] === 1) {
            const validChoices = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]]
            movePiece(validChoices, pieceToMove)
        }
        else if (pieceToMove[0] === 1 && pieceToMove[1] === 2) {
            const validChoices = [[0, 2], [1, 1], [2, 1]]
            movePiece(validChoices, pieceToMove)
        }
        else if (pieceToMove[0] === 2 && pieceToMove[1] === 0) {
            const validChoices = [[1, 0], [1, 1], [2, 1]]
            movePiece(validChoices, pieceToMove)
        }
        else if (pieceToMove[0] === 2 && pieceToMove[1] === 1) {
            const validChoices = [[2, 0], [1, 1], [2, 2]]
            movePiece(validChoices, pieceToMove)
        }
        else if (pieceToMove[0] === 2 && pieceToMove[1] === 2) {
            const validChoices = [[2, 1], [1, 1], [1, 2]]
            movePiece(validChoices, pieceToMove)
        }

    }

    //sets theboard to the updated board
    setBoard(newBoard);

    if (checkForWin(newBoard, player)) {
        console.log(`${player} wins!`);
        setWinner(player)

    } else {
        setPlayer(player === 'red' ? 'blue' : 'red');
    }

    // //changes player to us the human
    // setPlayer('red');
}

export default RandomLogic