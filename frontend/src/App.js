import React, { useState } from "react";
import Board from "./components/Board";
import "./App.css"; // For styling

const BOARD_SIZE = 15;

const App = () => {
  // State for the board (2D array filled with empty strings)
  const [board, setBoard] = useState(
    Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(""))
  );

  // Toggle between 'X' and 'O'
  const [isXNext, setIsXNext] = useState(true);

  // Handle cell click
  const handleCellClick = (row, col) => {
    if (board[row][col] !== "") return; // Ignore filled cells

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? (isXNext ? "X" : "O") : cell
      )
    );

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe (15x15)</h1>
      <Board board={board} onCellClick={handleCellClick} />
    </div>
  );
};

export default App;