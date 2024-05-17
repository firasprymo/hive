package com.vermeg.dtos;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;

    public UserDTO(Long id, String name, String email) {
    }

    public UserDTO() {

    }
}
