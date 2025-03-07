package com.example.tictactoe.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;

@Entity
public class Board {


    @Id
    //@GeneratedValue edValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private final int size;

    @Transient  // This field will NOT be saved in the database
    private String[][] grid;

    // ✅ JPA requires a no-arg constructor
    public Board() {
        this.size = 10;
    }

    public Board(int size) {
        this.size = size;
        this.grid = new String[size][size];
    }

    public String[][] getGrid() {
        return grid;
    }
}