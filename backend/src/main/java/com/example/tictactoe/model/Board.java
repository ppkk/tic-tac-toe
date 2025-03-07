package com.example.tictactoe.model;

public class Board {
    private final int size;
    private String[][] grid;

    public Board(int size) {
        this.size = size;
        this.grid = new String[size][size];
    }

    public String[][] getGrid() {
        return grid;
    }
}