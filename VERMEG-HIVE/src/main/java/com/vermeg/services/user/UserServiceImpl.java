package com.vermeg.services.user;

import com.vermeg.dtos.SignupDTO;
import com.vermeg.dtos.UserDTO;
import com.vermeg.entities.User;
import com.vermeg.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO createUser(SignupDTO signupDTO) {
        // Check if user already exists with the given email
        if (hasUserWithEmail(signupDTO.getEmail())) {
            throw new RuntimeException("User with this email already exists");
        }

        // Create new user entity and set properties
        User user = new User();
        user.setEmail(signupDTO.getEmail());
        user.setName(signupDTO.getName());
        user.setPassword(new BCryptPasswordEncoder().encode(signupDTO.getPassword()));

        // Save the user entity
        User createdUser = userRepository.save(user);

        // Prepare DTO for response
        UserDTO createdUserDTO = new UserDTO();
        createdUserDTO.setId(createdUser.getId());
        createdUserDTO.setEmail(createdUser.getEmail());
        createdUserDTO.setName(createdUser.getName());

        return createdUserDTO;
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll(); // Retrieve all users from repository
        return users.stream()
                .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail()))
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail()))
                .orElse(null);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(userDTO.getName());
            user.setEmail(userDTO.getEmail());
            User updatedUser = userRepository.save(user);
            return new UserDTO(updatedUser.getId(), updatedUser.getName(), updatedUser.getEmail());
        }
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
