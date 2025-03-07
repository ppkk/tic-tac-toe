package com.example.tictactoe.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests
public class GameController {

    private String[][] board = new String[15][15];
    private boolean isXNext = true;

    public GameController() {
        resetBoard();
    }

    // Get the current board
    @GetMapping("/board")
    public ResponseEntity<String[][]> getBoard() {
        return ResponseEntity.ok(board);
    }

    // Make a move
    @PostMapping("/move")
    public ResponseEntity<String[][]> makeMove(@RequestParam int row, @RequestParam int col) {
        if (row < 0 || row >= 15 || col < 0 || col >= 15 || board[row][col] != null) {
            return ResponseEntity.badRequest().body(board);
        }

        board[row][col] = isXNext ? "X" : "O";
        isXNext = !isXNext;

        return ResponseEntity.ok(board);
    }

    // Reset the board
    @PostMapping("/reset")
    public ResponseEntity<String> resetGame() {
        resetBoard();
        return ResponseEntity.ok("Game reset!");
    }

    private void resetBoard() {
        board = new String[15][15];
        isXNext = true;
    }
}
