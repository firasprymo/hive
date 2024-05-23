package com.vermeg.services.implementation;

import com.vermeg.dtos.SignupDTO;
import com.vermeg.dtos.UserDTO;
import com.vermeg.entities.AppUser;
import com.vermeg.repositories.UserRepository;
import com.vermeg.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public AppUser createUser(SignupDTO signupDTO) {
        // Check if user already exists with the given email
        if (hasUserWithEmail(signupDTO.getEmail())) {
            throw new RuntimeException("User with this email already exists");
        }
        Random random = new Random();
        int randomNumber = 1 + random.nextInt(4);
        // Create new user entity and set properties
        AppUser user = new AppUser();
        user.setEmail(signupDTO.getEmail());
        user.setUsername(signupDTO.getUsername());
        user.setImagePath("assets/images/profile/user-" + randomNumber + ".jpg");
        user.setPassword(new BCryptPasswordEncoder().encode(signupDTO.getPassword()));

        // Save the user entity
        AppUser createdUser = userRepository.save(user);

        // Prepare DTO for response
        UserDTO createdUserDTO = new UserDTO();
        createdUserDTO.setId(createdUser.getId());
        createdUserDTO.setEmail(createdUser.getEmail());
        createdUserDTO.setUsername(createdUser.getUsername());

        return createdUser;
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<AppUser> users = userRepository.findAll(); // Retrieve all users from repository
        return users.stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getEmail()))
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(Long id) {
        Optional<AppUser> optionalUser = userRepository.findById(id);
        return optionalUser.map(user -> new UserDTO(user.getId(), user.getUsername(), user.getEmail()))
                .orElse(null);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        Optional<AppUser> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            AppUser user = optionalUser.get();
            user.setUsername(userDTO.getUsername());
            user.setEmail(userDTO.getEmail());
            AppUser updatedUser = userRepository.save(user);
            return new UserDTO(updatedUser.getId(), updatedUser.getUsername(), updatedUser.getEmail());
        }
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public AppUser getUser() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        if (securityContext != null) {
            Authentication authentication = securityContext.getAuthentication();
            String email
                    = (String) authentication
                    .getPrincipal();

            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not foound"));
        }
        return null;
    }
}
