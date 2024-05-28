package com.vermeg.dtos;

import com.vermeg.entities.AppUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReponseDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt = LocalDateTime.now();
    private AppUser user;

}
