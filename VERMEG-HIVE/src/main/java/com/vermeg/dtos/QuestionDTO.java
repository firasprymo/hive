package com.vermeg.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionDTO {

    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;

    // No-args constructor
    public QuestionDTO() {}

    // Constructor with title and content
    public QuestionDTO(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
