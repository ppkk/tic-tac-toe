package com.example.tictactoe.repository;

import com.example.tictactoe.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// JPA - java persistence API -> to be used by Hibernate (for example)

@Repository
public interface GameRepository extends JpaRepository<Board, Long> { }