package com.vermeg.dtos;

import com.vermeg.entities.AppUser;
import lombok.*;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDTO {

    private Long id;
    private String title;
    private String content;
    private String priority;
    private AppUser user;

}
