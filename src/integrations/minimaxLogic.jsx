import React from 'react';

const MinimaxLogic = (setBoard, checkForWin, player, setPlayer, board, setWinner, playerPieces) => {
    //make a newBoard that contains what board had
    const newBoard = [...board];

    function minimax(board, depth, maximizingPlayer) {
        //when we finish searching return the score of the board
        if (depth === 0) {
            return evaluate(board);
        }

        //human wins so make bot think negative thoughts
        if (checkForWin(board, 'red')) {
            return -10;
        }

        //ai wins so give bot happy thoughts
        if (checkForWin(board, 'blue')) {
            return 10;
        }

        // we're maximizing player
        //we might have to adjust one of these to work with three men's morris
        if (maximizingPlayer) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === null) {
                        board[i][j] = 'blue';
                        let score = minimax(board, depth - 1, false);
                        board[i][j] = null;
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
        //this is the ai 
        else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === null) {
                        board[i][j] = 'red';
                        let score = minimax(board, depth - 1, true);
                        board[i][j] = null;
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }

    //gives us a point for having a piece on the board
    function evaluate(board) {
        let score = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 'blue') {
                    score++;
                } else if (board[i][j] === 'red') {
                    score--;
                }
            }
        }
        return score;
    }

    //finds valid moves for a given position
    function findValidMoves(board, row, col) {
        const validMoves = [];
        if (board[row][col] === null) {
            //check horizontal moves
            if (board[row][(col + 1) % 3] === null) {
                validMoves.push([row, (col + 1) % 3]);
            }
            if (board[row][(col + 2) % 3] === null) {
                validMoves.push([row, (col + 2) % 3]);
            }
            //check vertical moves
            if (board[(row + 1) % 3][col] === null) {
                validMoves.push([(row + 1) % 3, col]);
            }
            if (board[(row + 2) % 3][col] === null) {
                validMoves.push([(row + 2) % 3, col]);
            }
        }
        return validMoves;
    }

    // //finds best move for ai
    // function findBestMove(board) {
    //     let bestScore = -Infinity;
    //     let bestMove = null;

    //     //look thru entire board
    //     for (let i = 0; i < board.length; i++) {
    //         for (let j = 0; j < board[i].length; j++) {

    //             //if cell is empty
    //             if (board[i][j] === null) {
    //                 //temporarily place a blue piece on this cell to simulate move
    //                 board[i][j] = 'blue';
    //                 let score = minmax(board, 5, false);

    //                 //resets cell to be empty again so board is unchanged
    //                 board[i][j] = null;

    //                 //if current move is better than current best score update bestScore and bestMove
    //                 if (score > bestScore) {
    //                     bestScore = score;
    //                     bestMove = [i, j];
    //                 }
    //             }
    //         }
    //     }
    //     return bestMove;
    // }

    //purpose of this is to give our AI a valid option of pieces to move
    //we give it a blue piece location, and then as long as it has an empty
    //space it counts as a valid piece. 
    //each time it runs throug
    function findBestMove(board) {
        let bestScore = -Infinity;
        let bestMove = null;
    
        //look thru entire board
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
    
                //if cell is empty
                if (board[i][j] === null) {
                    //find valid moves for this position
                    const validMoves = findValidMoves(board, i, j);
                    console.log(`Valid moves: ${validMoves.reduce((init, pair) => init + `[${pair}]`,'')}`)
    
                    //temporarily place a blue piece on this cell to simulate move
                    board[i][j] = 'blue';
    
                    //check each valid move and get the minmax score
                    for (let k = 0; k < validMoves.length; k++) {
                        const [row, col] = validMoves[k];
                        board[row][col] = 'red';
                        let score = minimax(board, 5, false);
                        board[row][col] = null;
                        bestScore = Math.max(score, bestScore);
                        if (score === bestScore) {
                            bestMove = [i, j, row, col];
                        }
                    }
    
                    //resets cell to be empty again so board is unchanged
                    board[i][j] = null;
                }
            }
        }
        return bestMove;
    }

    if (playerPieces.length < 3) {
        //supposed to be the best move possible but it's not actually doing that lol
        const bestMove = findBestMove(newBoard);
        newBoard[bestMove[0]][bestMove[1]] = 'blue';
    } else if (playerPieces.length === 3) {
        // choose a blue piece to move
        const blueCoords = [];
        for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < newBoard[i].length; j++) {
                if (newBoard[i][j] === 'blue') {
                    blueCoords.push([i, j]);
                }
            }
        }
        const pieceToMove = blueCoords[Math.floor(Math.random() * blueCoords.length)];

        // find the best move for the ai
        const bestMove = findBestMove(newBoard);
        console.log(`Best move is: ${bestMove}`)

        // move the piece to the best move
        newBoard[bestMove[0]][bestMove[1]] = 'blue';
        newBoard[pieceToMove[0]][pieceToMove[1]] = null;
    }

    setBoard(newBoard);

    if (checkForWin(newBoard, player)) {
        console.log(`${player} wins!`);
    } else {
        setPlayer(player === 'red' ? 'blue' : 'red');
    }
};

//new way to think about it maybe; 
//we already do this part, but give the entire board state to this logic
//then we check the valid moves available to that position 
//might have to recode it to figure that out
//because depending on depth, it looks even further, and it's kinda good to just
//have a really well coded way to figure out available moves, or hard code every single
//possible state, which might take MUCH longer even though the board is small
export default MinimaxLogic;