import React, { useState, useEffect, useRef } from 'react'
import ButtonCircle from './ButtonCircle'
import TapatanBoard from '../assets/tapatan_board.png'
import RandomLogic from '../integrations/randomLogic'
import MinimaxLogic from '../integrations/minimaxLogic'

const Tapatanv2 = ({ logic }) => {
    const [board, setBoard] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ])
    const [player, setPlayer] = useState(Math.floor(Math.random() * 2) == 1 ? 'red' : 'blue')


    const [selectedPiece, setSelectedPiece] = useState(null)
    const [winner, setWinner] = useState(null)
    const playerPiecesRef = useRef([])

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

    const validMoves = [
        {piece: [0, 0], positions: [[0, 1], [1, 0], [1, 1]]},
        {piece: [0, 1], positions: [[0, 0], [0, 2], [1, 1]]},
        {piece: [0, 2], positions: [[0, 1], [1, 1], [1, 2]]},
        {piece: [1, 0], positions: [[0, 0], [2, 0], [1, 1]]},
        {piece: [1, 1], positions: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]]},
        {piece: [1, 2], positions: [[0, 2], [1, 1], [2, 2]]},
        {piece: [2, 0], positions: [[1, 0], [1, 1], [2, 1]]},
        {piece: [2, 1], positions: [[2, 0], [1, 1], [2, 2]]},
        {piece: [2, 2], positions: [[2, 1], [1, 1], [1, 2]]}
      ];


    useEffect(() => {
        if (!winner) {
            const interval = setInterval(() => {
                if (player === 'blue' && board.flat().filter(value => value === 'blue').length < 3) {
                    if (logic === 'random_move') {
                        RandomLogic(setBoard, checkForWin, player, setPlayer, board, setWinner, playerPiecesRef.current)
                    }
                    else if (logic === 'minimax') {
                        MinimaxLogic(setBoard, checkForWin, player, setPlayer, board, setWinner, playerPiecesRef.current)
                    }
                }
                else if (player === 'blue' && board.flat().filter(value => value === 'blue').length >= 3) {
                    if (logic === 'random_move') {
                        RandomLogic(setBoard, checkForWin, player, setPlayer, board, setWinner, playerPiecesRef.current)
                    }
                    else if (logic === 'minimax') {
                        MinimaxLogic(setBoard, checkForWin, player, setPlayer, board, setWinner, playerPiecesRef.current)
                    }
                }
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [board, player, winner])

    useEffect(() => {
        playerPiecesRef.current = board.flat().filter(value => value === player)
      }, [board, player])

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

            // playerPiecesRef.current = newBoard.flat().filter(value => value === player)
            if (playerPiecesRef.current.length < 3) {
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

                    console.log(`My pieces: ${playerPiecesRef.current.length}`)
                }
            }
            else if (playerPiecesRef.current.length === 3) {

                if (board[rowIndex][columnIndex] === player) {
                    setSelectedPiece([rowIndex, columnIndex])
                }

                if (checkForWin(newBoard, player)) {
                    setWinner(player)
                    console.log(`${player} wins!`)
                }
                else if (selectedPiece) {
                    if (!board[rowIndex][columnIndex]) {
                        const validPositions = validMoves.find(move => move.piece[0] === selectedPiece[0] && move.piece[1] === selectedPiece[1]).positions;
                        if (validPositions.some(position => position[0] === rowIndex && position[1] === columnIndex)) {
                          placePiece(newBoard, rowIndex, columnIndex, selectedPiece);
                        }
                      }

                }
                else if (board[rowIndex][columnIndex] !== 'blue' || board[rowIndex][columnIndex] !== 'red' || board[rowIndex][columnIndex] !== null) {
                    console.log('invalid option!')
                }
                else {
                    setPlayer(player === 'red' ? 'blue' : 'red')
                }
                console.log(`${rowIndex}, ${columnIndex}`)
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