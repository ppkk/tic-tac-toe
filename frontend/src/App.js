import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import Board from "./components/Board";
import "./App.css";

const SOCKET_URL = "ws://localhost:8080/stomp-endpoint"; // Use ws:// for WebSocket

const App = () => {
  const [board, setBoard] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: SOCKET_URL,
      connectHeaders: {},
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        client.subscribe("/topic/game", (message) => {
          console.log("Received message: ", message.body);
          setBoard(JSON.parse(message.body));
        });
        client.publish({ destination: "/app/reset" });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      onWebSocketClose: (event) => {
        console.log('WebSocket connection closed: ' + event);
      },
      onWebSocketError: (event) => {
        console.error('WebSocket error: ' + event);
      }
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const handleCellClick = (row, col) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: "/app/move",
        body: JSON.stringify({ row, col }),
      });
    } else {
      console.error("STOMP client is not connected");
    }
  };

  const resetGame = () => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({ destination: "/app/reset" });
    } else {
      console.error("STOMP client is not connected");
    }
  };

  return (
    <div className="app">
      <h1>Real-Time Tic Tac Toe</h1>
      <Board board={board} onCellClick={handleCellClick} />
      <button onClick={resetGame} className="reset-btn">Reset Game</button>
    </div>
  );
};

export default App;