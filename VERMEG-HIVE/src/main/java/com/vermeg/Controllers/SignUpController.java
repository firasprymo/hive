package com.vermeg.Controllers;

import com.vermeg.dtos.SignupDTO;
import com.vermeg.dtos.UserDTO;
import com.vermeg.entities.AppUser;
import com.vermeg.services.UserService;
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
    public ResponseEntity<AppUser> createUser(@RequestBody SignupDTO signupDTO) {
        return ResponseEntity.ok(userService.createUser(signupDTO));
    }
}
