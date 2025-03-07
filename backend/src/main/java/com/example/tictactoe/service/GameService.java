package com.example.tictactoe.service;

import com.example.tictactoe.model.Board;
import org.springframework.stereotype.Service;

@Service
public class GameService {
    private final Board board = new Board(15);

    public String[][] getBoard() {
        return board.getGrid();
    }

    public boolean makeMove(int row, int col, String player) {
        if (board.getGrid()[row][col] == null) {
            board.getGrid()[row][col] = player;
            return true;
        }
        return false;
    }
}