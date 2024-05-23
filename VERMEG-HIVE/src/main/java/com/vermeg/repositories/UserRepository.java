package com.vermeg.repositories;

import com.vermeg.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    Boolean existsByEmail(String email);

    Optional<AppUser> findByEmail(String email);

    // Note: Static methods inside an interface are not necessary for repository methods.
}
