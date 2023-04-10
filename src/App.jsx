import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  });
  const [player, setPlayer] = useState('X');

  const handleClick = (index) => {
    if (!board[index]) {
      setBoard({
        ...board,
        [index]: player,
      });
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const renderSquare = (index) => (
    <button className={`square ${board[index]}`} onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const calculateWinner = () => {
    const lines = [      
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const winner = calculateWinner();

  return (
    <div className="board">
      <div className="status">{winner ? `Winner: ${winner}` : `Next player: ${player}`}</div>
      <div className="row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default App;
