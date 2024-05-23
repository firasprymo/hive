package com.vermeg.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupDTO {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String imagePath;
}
