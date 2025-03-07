import React from "react";
import "./Board.css"; // For styling

const BOARD_SIZE = 15; // Change this for different sizes

const Board = ({ board, onCellClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <button
              key={colIndex}
              className="cell"
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;