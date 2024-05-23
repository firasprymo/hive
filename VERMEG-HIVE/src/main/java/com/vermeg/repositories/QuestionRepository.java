package com.vermeg.repositories;

import com.vermeg.entities.Question;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByTitleContainingIgnoreCase(String keyword);


}