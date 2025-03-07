import React from "react";
import "./Board.css";

const Board = ({ board, onCellClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell ? (cell === "X" ? "x" : "o") : ""}`}
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
