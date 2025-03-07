package com.example.tictactoe.controller;

import com.example.tictactoe.model.Move;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameWebSocketController {

    private String[][] board = new String[15][15];
    private boolean isXNext = true;

    public GameWebSocketController() {
        resetBoard();
    }

    @MessageMapping("/move")
    @SendTo("/topic/game")
    public String[][] processMove(Move move) {
        if (move.getRow() < 0 || move.getRow() >= 15 || move.getCol() < 0 || move.getCol() >= 15 || board[move.getRow()][move.getCol()] != null) {
            return board;
        }

        board[move.getRow()][move.getCol()] = isXNext ? "X" : "O";
        isXNext = !isXNext;

        return board; // Send updated board to all clients
    }

    @MessageMapping("/reset")
    @SendTo("/topic/game")
    public String[][] resetGame() {
        resetBoard();
        return board;
    }

    private void resetBoard() {
        board = new String[15][15];
        isXNext = true;
    }
}
