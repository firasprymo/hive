package com.vermeg.repositories;

import com.vermeg.entities.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Questions, Long> {

    List<Questions> findByTitleContainingIgnoreCase(String keyword);


}