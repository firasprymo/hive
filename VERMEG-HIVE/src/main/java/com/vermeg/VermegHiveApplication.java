package com.vermeg;

import com.vermeg.dtos.SignupDTO;
import com.vermeg.repositories.UserRepository;
import com.vermeg.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VermegHiveApplication {

    public static void main(String[] args) {
        SpringApplication.run(VermegHiveApplication.class, args);
    }

    @Bean
    CommandLineRunner start(UserService userService,
                            UserRepository userRepository) {

        return args -> {
            if (!userRepository.existsByEmail("admin@gmail.com"))
                userService.createUser(new SignupDTO(
                                null,
                                "admin",
                                "admin@gmail.com",
                                "admin123",
                                "assets/images/profile/user-4.jpg"
                        )
                );
        };
    }
}
