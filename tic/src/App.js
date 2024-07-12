import React, { useState } from 'react';
import './App.css';

const INITIAL_BOARD = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const renderSquare = (index) => {
    return (
      <button className={`square ${winner && winner === board[index] ? 'winner' : ''}`} onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(INITIAL_BOARD);
    setCurrentPlayer('X');
    setPlayer1Name('');
    setPlayer2Name('');
  };

  let status;
  if (winner) {
    status = `Winner: ${winner === 'X' ? player1Name : player2Name}`;
  } else if (board.every((square) => square !== null)) {
    status = 'It\'s a draw!';
  } else {
    status = `Next player: ${currentPlayer === 'X' ? player1Name : player2Name} (${currentPlayer})`;
  };

  const handlePlayer1Change = (event) => {
    setPlayer1Name(event.target.value);
  };

  const handlePlayer2Change = (event) => {
    setPlayer2Name(event.target.value);
  };

  return (
    <div className="game">
      <h1 className="game-heading">Tic Tac Toe</h1>
      <div className="player-inputs">
        <label>
          Player 1 (X):
          <input type="text" value={player1Name} onChange={handlePlayer1Change} />
        </label>
        <label>
          Player 2 (O):
          <input type="text" value={player2Name} onChange={handlePlayer2Change} />
        </label>
      </div>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
      <div className="game-reset">
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

// Function to calculate the winner
const calculateWinner = (squares) => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;
