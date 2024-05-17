package com.vermeg.Controllers;

import com.vermeg.dtos.SignupDTO;
import com.vermeg.dtos.UserDTO;
import com.vermeg.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signup")
public class SignUpController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody SignupDTO signupDTO) {
        if (signupDTO.getPassword() == null || signupDTO.getPassword().isEmpty()) {
            return new ResponseEntity<>("Password cannot be null or empty", HttpStatus.BAD_REQUEST);
        }
        if (userService.hasUserWithEmail(signupDTO.getEmail())) {
            return new ResponseEntity<>("User already exists: " + signupDTO.getEmail(), HttpStatus.NOT_ACCEPTABLE);
        }
     UserDTO createdUser = userService.createUser(signupDTO);
        if (createdUser == null) {
            return new ResponseEntity<>("User not created, please try again later", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
}
