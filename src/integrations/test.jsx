import React from 'react'

const MinimaxLogic = (setBoard, checkForWin, player, setPlayer, board, setWinner, playerPieces) => {
    const newBoard = [...board]
    //this function will be recursive
    //it needs to know what the board looks like, the depth at which we are looking
    //and whether or not it is the maximizing players turn
    function minimax(newBoard, depth, maximizingPlayer) {
        //this should get us the score of the newBoard when
        if (depth === 0) {
            return evaluate(newBoard)
        }

        //if the human wins in a future move (since this runs recursively we "should" eventually
        //find an answer)
        //check for win takes the newBoard state
        if (checkForWin(newBoard, 'red')) {
            return -10
        }

        //if the ai wins in a future move, then it gets positive points
        if (checkForWin(newBoard, 'blue')) {
            return 10
        }


        //one way we can think about it is when its less than three pieces, treat it like
        //tic tac toe, and when we get to three on both sides, THAT'S when we treat it like
        //three men's morris
        if (playerPieces.length < 3) {
            //this should be the AI? because they want to get positive points?
            if (maximizingPlayer) {
                let bestScore = -Infinity
                for (let i = 0; i < newBoard.length; ++i) {
                    for (let j = 0; j < newBoard[i].length; j++) {
                        if (newBoard[i][j] === null) {
                            //simulate blue piece
                            newBoard[i][j] = 'blue'
                            //go further recursively and subtract depth by one
                            let score = minimax(newBoard, depth - 1, false)
                            //set it back
                            newBoard[i][j] = null
                            bestScore = Math.max(score, bestScore)
                        }
                    }
                }
                return bestScore;
            }
            //minimizing player should be human?
            else {
                let bestScore = Infinity
                for (let i = 0; i < newBoard.length; ++i) {
                    for (let j = 0; j < newBoard.length; ++j) {
                        if (newBoard[i][j] === null) {
                            newBoard[i][j] = 'red'
                            let score = minimax(newBoard, depth - 1, true)
                            newBoard[i][j] = null;
                            bestScore = Math.min(score, bestScore)
                        }
                    }
                }
                return bestScore
            }
        }
        else if (playerPieces.length === 3){
            //code to fill in here late if its different?
            if (maximizingPlayer) {
                //todo
            }
            else {
                //todo
            }
        }   
    }

    //look at the board and give ai points
    function evaluate(newBoard) {
        let score = 0
        for (let i = 0; i < newBoard.length; ++i) {
            for (let j = 0; j < newBoard[i].length; ++j) {
                if (newBoard[i][j] === 'blue') {
                    score++
                }
                else if (newBoard[i][j] === 'red') {
                    score--
                }
            }
        }
        return score
    }

    //give the best move option available for the ai
    function findBestMove(newBoard) {
        let bestScore = -Infinity
        let bestMove = null

        //if player pieces is less than 3 look for empty null spots
        if (playerPieces.length < 3) {
            for (let i = 0; i < newBoard.length; ++i) {
                for (let j = 0; j < newBoard[i].length; ++j) {
                    if(newBoard[i][j] === null) {
                        newBoard[i][j] = 'blue'
                        //lets give a depth of 10
                        let score = minimax(newBoard, 10, false)
                        newBoard[i][j] = null

                        if (score > bestScore) {
                            bestScore = score
                            bestMove = [i, j]
                        }
                    }
                }
            }
        }
        //if player pieces IS 3 then look for blue spots to move into null spots
        else if (playerPieces.length === 3) {
            //give valid blue piece to move
        }
    }
}

export default MinimaxLogic