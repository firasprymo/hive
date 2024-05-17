package com.vermeg.dtos;

import lombok.Data;

@Data
public class SignupDTO {
    private Long id;



    private String name;
    private String email;
    private String password;
}
