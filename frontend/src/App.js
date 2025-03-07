import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";

const API_URL = "http://localhost:8080/api/game";

const App = () => {
  const [board, setBoard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch board state on load
  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      const response = await fetch(`${API_URL}/board`);
      const data = await response.json();
      setBoard(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching board:", error);
    }
  };

  const handleCellClick = async (row, col) => {
    try {
      const response = await fetch(`${API_URL}/move?row=${row}&col=${col}`, {
        method: "POST",
      });
      const data = await response.json();
      setBoard(data);
    } catch (error) {
      console.error("Error making move:", error);
    }
  };

  const resetGame = async () => {
    try {
      await fetch(`${API_URL}/reset`, { method: "POST" });
      fetchBoard();
    } catch (error) {
      console.error("Error resetting game:", error);
    }
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe (15x15)</h1>
      {isLoading ? <p>Loading...</p> : <Board board={board} onCellClick={handleCellClick} />}
      <button onClick={resetGame} className="reset-btn">Reset Game</button>
    </div>
  );
};

export default App;
;