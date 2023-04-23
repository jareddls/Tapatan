import React, { useState, useEffect } from 'react';
import ButtonCircle from './ButtonCircle';
import TapatanBoard from '../assets/tapatan_board.png'
import RandomLogic from '../integrations/randomLogic'

//destructuring from (props) to ({logic})
//allows us to call logic instead of props.logic
// example:
// let obj = {a: '1', b: '2'}
// let {a, b} = obj
// console.log(a) logs '1'
const Tapatan = ({ logic }) => {
    //creates empty board with values of null
    const [board, setBoard] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]);

    //all possible winning combinations
    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];

    //creates adjustable player with default starting value of red
    //which is player one
    const [player, setPlayer] = useState(Math.floor(Math.random() * 2) == 1 ? 'red' : 'blue');

    //should allow us to select a piece that already exists
    //currently does not work the way i want it to
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [moving, setMoving] = useState(false)
    const [position, setPosition] = useState({current: null, new: null})

    useEffect(() => {
        const interval = setInterval(() => {
            if (player === 'blue' && board.flat().filter(value => value === 'blue').length < 3) {
                if (logic === 'random_move') {
                    RandomLogic(setBoard, checkForWin, player, setPlayer, board);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [board, player]);

    useEffect(() => {
        if (position.current && position.new) {
          const newBoard = [...board];
          newBoard[position.current[0]][position.current[1]] = null;
          newBoard[position.new[0]][position.new[1]] = player;
          setBoard(newBoard);
          setPosition({ current: null, new: null });
          setMoving(false);
          //setPlayer(player === 'red' ? 'blue' : 'red');
        }
      }, [position]);

    // useEffect(() => {
    //     if (position.current && position.new) {
    //       const newBoard = [...board];
    //       newBoard[position.current[0]][position.current[1]] = null;
    //       newBoard[position.new[0]][position.new[1]] = player;
    //       setBoard(newBoard);
    //       setPosition({ current: null, new: null });
    //       setMoving(false);
    //       setPlayer(player === 'red' ? 'blue' : 'red');
    //     } else if (!position.current && !position.new) {
    //       setMoving(false);
    //     }
    //     if (player === 'blue' && board.flat().filter(value => value === 'blue').length < 3) {
    //       if (logic === 'random_move') {
    //         RandomLogic(setBoard, checkForWin, player, setPlayer, board);
    //       }
    //     }
    //   }, [position, board, player]);

    //logic for winning board state
    function checkForWin(board, player) {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (
                board[a[0]][a[1]] === player &&
                board[b[0]][b[1]] === player &&
                board[c[0]][c[1]] === player
            ) {
                return true;
            }
        }
        return false;
    };

    //for anytime a click happens on one of the board spots
    const handleClick = (rowIndex, columnIndex) => {
        console.log(board)
        //select piece and move it to available adjacent empty spot
            //make sure it's whoever's turns piece can move

            //when piece moves delete old position (turn it back to white)
            //and set new position to players color

            //moving state
            //positions state is an object with old position and new position
            //which you set with a click handler

            //if no spread operator, it'd be a singular array inside newBoard, instead of the multiple values
        const newBoard = [...board];
        if (player == 'red') {
            // check if cell is empty
            // check if player has placed all three pieces
            const playerPieces = newBoard.flat().filter(value => value === player);
            if (playerPieces.length < 3) {
                // place new piece on the board
                //if board is null set to player color, if not set it to what it originally was
                if (!board[rowIndex][columnIndex]) {
                    newBoard[rowIndex][columnIndex] = player
                    setBoard(newBoard);
                    // setPosition({...position, current: [rowIndex, columnIndex]})
                }
            } 
            else if (playerPieces.length === 3) {
                console.log(`${rowIndex}, ${columnIndex}`)
                if (board[rowIndex][columnIndex] === 'red') {
                    setPosition({...position, current: [rowIndex, columnIndex]})
                    setMoving(true);
                    console.log(moving);
                }
            }

        

            if (checkForWin(newBoard, player)) {
                console.log(`${player} wins!`);
            } else if (board[rowIndex][columnIndex] !== 'red'){
                console.log("IT'S EITHER AN EMPTY SQUARE OR BLUE'S PIECE BOZO")
            } else {
                setPlayer(player === 'red' ? 'blue' : 'red');
            }

            //when we click on a player piece it returns the rowIndex and columnIndex
            
        }
        if (moving) {
            console.log('now true')
            if (board[rowIndex][columnIndex] === null) setPosition(prev =>({...prev, new: [rowIndex, columnIndex]}))
            console.log(position)

            if(position.current && position.new){
                newBoard[position.current[0]][position.current[1]] = null
                newBoard[position.new[0]][position.new[1]] = "red"
                setBoard(newBoard);
            }
        }

        //this would only highlight the piece, but its a big yellow square lol
        if (board[rowIndex][columnIndex] === player) {
            setSelectedPiece([rowIndex, columnIndex]);
        }
    };

    return (
        <div>
            <div className='triumph-regular top-middle' style={{ fontSize: '35px' }}>
                {player == 'red' ? 'Your' : 'AI\'s'} TURN
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
                            const isRed = cell === 'red';
                            const isBlue = cell === 'blue';
                            const isEmpty = !isRed && !isBlue;
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

                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tapatan;
