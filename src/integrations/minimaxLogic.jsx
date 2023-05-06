import React from 'react'

const minimaxLogicv2 = (setBoard, checkForWin, player, setPlayer, board, setWinner, playerPieces) => {
    const newBoard = [...board]

    //give it the board, the depth we want to look at, and the boolean if it's maximizing player
    function minimax(newBoard, depth, maximizingPlayer) {
        if (depth === 0 || checkForWin(newBoard, 'red') || checkForWin(newBoard, 'blue')) {
            if (checkForWin(newBoard, 'red')) {
                console.log(`Red won somewhere in the simulation.`)
            }

            if (checkForWin(newBoard, 'blue')) {
                console.log(`Blue won somewhere in the simulation.`)
                console.log(`Blue's board was: ${newBoard}`)
            }
            return evaluate(newBoard);
        }
        if (maximizingPlayer) {
            return max_value(newBoard, depth);
        } else {
            return min_value(newBoard, depth);
        }
    }

    function max_value(newBoard, depth) {
        let bestScore = -Infinity;
        if (playerPieces.length < 3) {
            let possibleMoves = actions(newBoard, 'red');
            console.log(`Possible moves for Red in simulation: ${possibleMoves}`)
            for (let i = 0; i < possibleMoves.length; i++) {
                let [x1, y1, x2, y2] = possibleMoves[i];
                newBoard[x2][y2] = 'red';
                let score = minimax(newBoard, depth - 1, false);
                newBoard[x2][y2] = null;
                bestScore = Math.max(score, bestScore);
            }
        } else {
            let possibleMoves = actions(newBoard, 'red');
            console.log(`Possible moves for Red in simulation: ${possibleMoves}`)
            for (let i = 0; i < possibleMoves.length; i++) {
                let [x1, y1, x2, y2] = possibleMoves[i];
                newBoard[x1][y1] = null;
                newBoard[x2][y2] = 'red';
                let score = minimax(newBoard, depth - 1, false);
                newBoard[x1][y1] = 'red';
                newBoard[x2][y2] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    }

    function min_value(newBoard, depth) {
        let bestScore = Infinity;
        if (playerPieces.length < 3) {
            let possibleMoves = actions(newBoard, 'blue');
            console.log(`Possible moves for Blue in simulation: ${possibleMoves}`)
            for (let i = 0; i < possibleMoves.length; i++) {
                let [x1, y1, x2, y2] = possibleMoves[i];
                newBoard[x2][y2] = 'blue';
                let score = minimax(newBoard, depth - 1, true);
                newBoard[x2][y2] = null;
                bestScore = Math.min(score, bestScore);
            }
        } else {
            let possibleMoves = actions(newBoard, 'blue');
            console.log(`Possible moves for Blue in simulation: ${possibleMoves}`)
            for (let i = 0; i < possibleMoves.length; i++) {
                let [x1, y1, x2, y2] = possibleMoves[i];
                newBoard[x1][y1] = null;
                newBoard[x2][y2] = 'blue';
                let score = minimax(newBoard, depth - 1, true);
                newBoard[x1][y1] = 'blue';
                newBoard[x2][y2] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }

    function evaluate(board) {
        let playerPieces = 0
        let opponentPieces = 0
        //full 3 in a row
        let playerMills = 0
        let opponentMills = 0

        //threats
        let playerThreats = 0
        let opponentThreats = 0

        //for the evaluation function itself
        let score = 0

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 'red') {
                    playerPieces++
                    if (isInMill(board, i, j)) {
                        playerMills++;
                    } else if (isPotentialMill(board, i, j, player)) {
                        playerThreats++;
                    }
                } else if (board[i][j] === 'blue') {
                    opponentPieces++
                    if (isInMill(board, i, j)) {
                        opponentMills++;
                    } else if (isPotentialMill(board, i, j, 'red')) {
                        opponentThreats++;
                    }
                }
            }
        }

        score += (playerPieces - opponentPieces) * 10;
        score += (playerMills - opponentMills) * 100;
        score += (playerThreats - opponentThreats) * 50;

        // console.log(`Score is: ${score}`)
        return score;
    }

    //is already done
    function isInMill(board, row, col) {
        let piece = board[row][col];
        if (piece === '') {
            return false;
        }
        if (board[row][(col + 1) % 3] === piece && board[row][(col + 2) % 3] === piece) {
            return true;
        }
        if (board[(row + 1) % 3][col] === piece && board[(row + 2) % 3][col] === piece) {
            return true;
        }
        if ((row === 0 && col === 0) || (row === 1 && col === 1) || (row === 2 && col === 2)) {
            if (board[0][0] === piece && board[1][1] === piece && board[2][2] === piece) {
                return true;
            }
        }
        if ((row === 0 && col === 2) || (row === 1 && col === 1) || (row === 2 && col === 0)) {
            if (board[0][2] === piece && board[1][1] === piece && board[2][0] === piece) {
                return true;
            }
        }
        return false;
    }

    //possible threat to ai
    function isPotentialMill(board, row, col, player) {
        let piece = board[row][col];
        if (piece === '') {
            return false;
        }
        let count = 0;
        if (board[row][(col + 1) % 3] === player || board[row][(col + 1) % 3] === '') {
            count++;
        }
        if (board[row][(col + 2) % 3] === player || board[row][(col + 2) % 3] === '') {
            count++;
        }
        if (count === 2) {
            return true;
        }
        count = 0;
        if (board[(row + 1) % 3][col] === player || board[(row + 1) % 3][col] === '') {
            count++;
        }
        if (board[(row + 2) % 3][col] === player || board[(row + 2) % 3][col] === '') {
            count++;
        }
        if (count === 2) {
            return true;
        }
        return false;
    }

    function findBestMove(possibleMoves, board, player) {
        let bestScore = -Infinity;
        let bestMove = null;
    
        for (let i = 0; i < possibleMoves.length; i++) {
            let [x1, y1, x2, y2] = possibleMoves[i];
            if (playerPieces.length < 3) {
                board[x2][y2] = player;
            } else if (playerPieces.length  === 3) {
                board[x1][y1] = null;
                board[x2][y2] = player;
            }
            let score = minimax(board, 3, true);
            if (playerPieces.length < 3) {
                board[x2][y2] = null;
            } else {
                board[x1][y1] = player;
                board[x2][y2] = null;
            }
            if (score > bestScore) {
                bestScore = score;
                bestMove = [x1, y1, x2, y2];
            }
        }
        console.log(`Best move is: ${bestMove}`)
        return bestMove;
    }

    //returns us what should be the possible moves for a player
    function actions(board, player) {
        let moves = findPossibleMoves(board, player);
        console.log(`Possible moves for ${player}:`);
        for (let i = 0; i < moves.length; i++) {
            console.log(moves[i]);
        }
        return moves;
    }

    //all possible moves, at before 3 pieces, and after 3 pieces.
    function findPossibleMoves(board, player) {
        let moves = [];
    
        if (playerPieces.length < 3) {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === null) {
                        moves.push([-1, -1, i, j]);
                    }
                }
            }
        } else {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === player) {
                        let validMoves = getValidMoves(board, i, j);
                        for (let k = 0; k < validMoves.length; k++) {
                            let [x, y] = validMoves[k];
                            moves.push([i, j, x, y]);
                        }
                    }
                }
            }
        }
    
        return moves;
    }

    //find valid moves from a position
    function getValidMoves(board, i, j) {
        let moves = [];
        if (i === 0 && j === 0){
            if (board[0][1] === null) {
                moves.push([0,1])
            }
            if (board[1][1] === null) {
                moves.push([1,1])
            }
            if (board[1][0] === null) {
                moves.push([1,0])
            }
        }
        else if (i === 0 && j === 1){
            if (board[0][0] === null) {
                moves.push([0,0])
            }
            if (board[1][1] === null) {
                moves.push([1,1])
            }
            if (board[0][2] === null) {
                moves.push([0,2])
            }
        }
        else if (i === 0 && j === 2){
            if (board[0][1] === null) {
                moves.push([0,1])
            }
            if (board[1][1] === null) {
                moves.push([1,1])
            }
            if (board[1][2] === null) {
                moves.push([1,2])
            }
        }
        else if (i === 1 && j === 0){
            if (board[0][0] === null) {
                moves.push([0,0])
            }
            if (board[1][1] === null) {
                moves.push([1,1])
            }
            if (board[2][0] === null) {
                moves.push([2,0])
            }
        }
        else if (i === 1 && j === 1){
            if (board[0][0] === null) {
                moves.push([0,0])
            }
            if (board[0][1] === null) {
                moves.push([0,1])
            }
            if (board[0][2] === null) {
                moves.push([0,2])
            }
            if (board[1][0] === null) {
                moves.push([1,0])
            }
            if (board[1][2] === null) {
                moves.push([1,2])
            }
            if (board[2][0] === null) {
                moves.push([2,0])
            }
            if (board[2][1] === null) {
                moves.push([2,1])
            }
            if (board[2][2] === null) {
                moves.push([2,2])
            }
        }
        else if (i === 1 && j === 2){
            if (board[0][2] === null) {
                moves.push([0,2])
            }
            if (board[1][1] === null) {
                moves.push([1,1])
            }
            if (board[2][2] === null) {
                moves.push([2,2])
            }
        }
        else if (i === 2 && j === 0){
            if (board[1][0] === null) {
                moves.push([1,0])
            }
            if (board[1][1] === null) {
                moves.push([1,1])
            }
            if (board[2][1] === null) {
                moves.push([2,1])
            }
        }
        else if (i === 2 && j === 1){
            if (board[2][0] === null) {
                moves.push([2,0])
            }
            if (board[1][1] === null) {
                moves.push([1,1])
            }
            if (board[2][2] === null) {
                moves.push([2,2])
            }
        }
        else if (i === 2 && j === 2){
            if (board[2][1] === null) {
                moves.push([2,1])
            }
            if (board[1][1] === null) {
                moves.push([1,1])
            }
            if (board[1][2] === null) {
                moves.push([1,2])
            }
        }
        return moves;
    }

    let possibleMoves = actions(board, 'blue')

    if (playerPieces.length < 3) {
        let bestMove = findBestMove(possibleMoves, newBoard, 'blue')
        newBoard[bestMove[2]][bestMove[3]] = 'blue';
    }
    else if (playerPieces.length === 3){
        let bestMove = findBestMove(possibleMoves, newBoard, 'blue')
        newBoard[bestMove[0]][bestMove[1]] = null
        newBoard[bestMove[2]][bestMove[3]] = 'blue'
    }

    setBoard(newBoard)

    if (checkForWin(newBoard, player)) {
        console.log(`${player} wins!`);
    } else {
        setPlayer(player === 'red' ? 'blue' : 'red');
    }
}

export default minimaxLogicv2