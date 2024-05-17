package com.vermeg.services.user;



import com.vermeg.dtos.SignupDTO;
import com.vermeg.dtos.UserDTO;

import java.util.List;

public interface UserService {

    UserDTO createUser(SignupDTO signupDTO);

    boolean hasUserWithEmail(String email);

    List<UserDTO> getAllUsers();

    UserDTO getUserById(Long id);

    UserDTO updateUser(Long id, UserDTO userDTO);

    void deleteUser(Long id);
}
