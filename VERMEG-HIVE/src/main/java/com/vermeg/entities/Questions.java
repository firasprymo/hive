package com.vermeg.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "questions")
public class Questions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private int upVotes;

    @Column(nullable = false)
    private int downVotes;

    // No-args constructor
    public Questions() {}

    // Constructor with title and content
    public Questions(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
