package com.vermeg.dtos;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDTO {

    private Long id;
    private String title;
    private String content;
    private String priority;
    private LocalDateTime createdAt;


}
