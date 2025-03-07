package com.example.tictactoe.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
public class GameController {

    @GetMapping("/status")
    public String getStatus() {
        return "Game is running!";
    }
}
