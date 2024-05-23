package com.vermeg.services;



import com.vermeg.dtos.SignupDTO;
import com.vermeg.dtos.UserDTO;
import com.vermeg.entities.AppUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

public interface UserService {

    AppUser createUser(SignupDTO signupDTO);

    boolean hasUserWithEmail(String email);

    List<UserDTO> getAllUsers();

    UserDTO getUserById(Long id);

    UserDTO updateUser(Long id, UserDTO userDTO);

    void deleteUser(Long id);
    AppUser getUser() ;

}
