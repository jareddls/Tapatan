import React, { useState, useEffect } from 'react'
import ButtonCircle from './ButtonCircle'
import TapatanBoard from '../assets/tapatan_board.png'
import RandomLogic from '../integrations/randomLogic'

const Tapatanv2 = ({ logic }) => {
    const [board, setBoard] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ])
    const [player, setPlayer] = useState(Math.floor(Math.random() * 2) == 1 ? 'red' : 'blue')
    const [selectedPiece, setSelectedPiece] = useState(null)
    const [winner, setWinner] = useState(null)
    const [playerPieces, setPlayerPieces] = useState([])

    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ]



    useEffect(() => {
        if (!winner) {
            const interval = setInterval(() => {
                if (player === 'blue' && board.flat().filter(value => value === 'blue').length < 3) {
                    if (logic === 'random_move') {
                        RandomLogic(setBoard, checkForWin, player, setPlayer, board, setWinner, playerPieces)
                    }
                }
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [board, player, winner])

    function checkForWin(board, player) {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i]
            if (
                board[a[0]][a[1]] === player &&
                board[b[0]][b[1]] === player &&
                board[c[0]][c[1]] === player
            ) {
                return true
            }
        }
        return false
    }

    function placePiece(newBoard, rowIndex, columnIndex, selectedPiece) {
        newBoard[rowIndex][columnIndex] = player
        newBoard[selectedPiece[0]][selectedPiece[1]] = null
        setBoard(newBoard)
        setSelectedPiece(null)

        if (checkForWin(newBoard, player)) {
            setWinner(player)
            console.log(`${player} wins!`)
        } else setPlayer(player === 'red' ? 'blue' : 'red')
    }


    const handleClick = (rowIndex, columnIndex) => {
        const newBoard = [...board]
        if (player === 'red') {



            //THIS could be the issue to why double clicking happens because
            //we do a use state which often has problems with rendering until
            //the second click
            //const playerPieces = newBoard.flat().filter(value => value === player)
            setPlayerPieces(newBoard.flat().filter(value => value === player))
            if (playerPieces.length < 3) {
                // place new piece on the board
                //if board is null set to player color, if not set it to what it originally was
                if (!board[rowIndex][columnIndex]) {
                    newBoard[rowIndex][columnIndex] = player
                    setBoard(newBoard)
                    if (checkForWin(newBoard, player)) {
                        setWinner(player)
                        console.log(`${player} wins!`)
                    }
                    setPlayer(player === 'red' ? 'blue' : 'red')

                    // setPosition({...position, current: [rowIndex, columnIndex]})
                    console.log(`My pieces: ${playerPieces.length}`)
                }
            }
            else if (playerPieces.length === 3) {

                if (board[rowIndex][columnIndex] === player) {
                    setSelectedPiece([rowIndex, columnIndex])
                }

                if (checkForWin(newBoard, player)) {
                    setWinner(player)
                    console.log(`${player} wins!`)
                }
                else if (selectedPiece) {
                    if (!board[rowIndex][columnIndex]) {
                        if (selectedPiece[0] === 0 && selectedPiece[1] == 0){
                            if ((rowIndex === 0 && columnIndex === 1) || (rowIndex === 1 && columnIndex === 0) || (rowIndex === 1 && columnIndex === 1)){
                                placePiece(newBoard, rowIndex, columnIndex, selectedPiece)
                            }
                            
                        }
                        else if (selectedPiece[0] === 0 && selectedPiece[1] == 1){
                            if ((rowIndex === 0 && columnIndex === 0) || (rowIndex === 1 && columnIndex === 1) || (rowIndex === 0 && columnIndex === 2)){
                                placePiece(newBoard, rowIndex, columnIndex, selectedPiece)
                            }
                            
                        }
                        else if (selectedPiece[0] === 0 && selectedPiece[1] == 2){
                            if ((rowIndex === 0 && columnIndex === 1) || (rowIndex === 1 && columnIndex === 1) || (rowIndex === 1 && columnIndex === 2)){
                                placePiece(newBoard, rowIndex, columnIndex, selectedPiece)
                            }
                            
                        }
                        else if (selectedPiece[0] === 1 && selectedPiece[1] == 0){
                            if ((rowIndex === 0 && columnIndex === 0) || (rowIndex === 2 && columnIndex === 1) || (rowIndex === 1 && columnIndex === 1)){
                                placePiece(newBoard, rowIndex, columnIndex, selectedPiece)
                            }
                            
                        }
                        else if (selectedPiece[0] === 1 && selectedPiece[1] == 1){
                            if ((rowIndex === 0 && columnIndex === 0) || (rowIndex === 0 && columnIndex === 1) || (rowIndex === 0 && columnIndex === 2) ||
                                (rowIndex === 1 && columnIndex === 0) || (rowIndex === 1 && columnIndex === 2) || 
                                (rowIndex === 2 && columnIndex === 0) || (rowIndex === 2 && columnIndex === 1) || (rowIndex === 2 && columnIndex === 2)){
                                placePiece(newBoard, rowIndex, columnIndex, selectedPiece)
                            }
                            
                        }
                        else if (selectedPiece[0] === 1 && selectedPiece[1] == 2){
                            if ((rowIndex === 0 && columnIndex === 2) || (rowIndex === 1 && columnIndex === 1) || (rowIndex === 2 && columnIndex === 2)){
                                placePiece(newBoard, rowIndex, columnIndex, selectedPiece)
                            }
                            
                        }
                        else if (selectedPiece[0] === 2 && selectedPiece[1] == 0){
                            if ((rowIndex === 1 && columnIndex === 0) || (rowIndex === 1 && columnIndex === 1) || (rowIndex === 2 && columnIndex === 1)){
                                placePiece(newBoard, rowIndex, columnIndex, selectedPiece)
                            }
                            
                        }
                        else if (selectedPiece[0] === 2 && selectedPiece[1] == 1){
                            if ((rowIndex === 2 && columnIndex === 0) || (rowIndex === 1 && columnIndex === 1) || (rowIndex === 2 && columnIndex === 2)){
                                placePiece(newBoard, rowIndex, columnIndex, selectedPiece)
                            }
                            
                        }
                        else if (selectedPiece[0] === 2 && selectedPiece[1] == 2){
                            if ((rowIndex === 2 && columnIndex === 1) || (rowIndex === 1 && columnIndex === 1) || (rowIndex === 1 && columnIndex === 2)){
                                placePiece(newBoard, rowIndex, columnIndex, selectedPiece)
                            }
                            
                        }
                        //placePiece(newBoard, rowIndex, columnIndex, selectedPiece)
                    }

                }
                else if (board[rowIndex][columnIndex] !== 'blue' || board[rowIndex][columnIndex] !== 'red' || board[rowIndex][columnIndex] !== null) {
                    console.log('shouldn\'t be allowed to click on anything right now')
                }
                else {
                    // console.log('the player got changed')
                    setPlayer(player === 'red' ? 'blue' : 'red')
                }
                console.log(`${rowIndex}, ${columnIndex}`)
                //if (board[rowIndex][columnIndex] === 'red') {
                //    setPosition({...position, current: [rowIndex, columnIndex]}) 
                //}
            }



        }

    }

    return (
        <div>
            <div className='triumph-regular top-middle' style={{ fontSize: '35px' }}>
                {winner ? `${winner} wins` : player == 'red' ? 'Your TURN' : 'AI\'s TURN'}
            </div>
            <div className="board" style={{
                backgroundImage: `url(${TapatanBoard})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: `87px 88px`
            }}>
                {/* <img src ={TapatanBoard} alt="Tapatan Board"/> */}
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, columnIndex) => {
                            const isRed = cell === 'red'
                            const isBlue = cell === 'blue'
                            const isEmpty = !isRed && !isBlue
                            return (
                                <div
                                    key={columnIndex}
                                    //i forgot why i needed this, but i now can't get rid of it
                                    className={`cell ${selectedPiece && rowIndex === selectedPiece[0] && columnIndex === selectedPiece[1] ? '' : ''}`}
                                >
                                    {isRed && <ButtonCircle color="red" onClick={() => handleClick(rowIndex, columnIndex)} />}
                                    {isBlue && <ButtonCircle color="blue" onClick={() => handleClick(rowIndex, columnIndex)} />}
                                    {isEmpty && (
                                        <ButtonCircle color="white" onClick={() => handleClick(rowIndex, columnIndex)} />
                                    )}
                                </div>

                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tapatanv2