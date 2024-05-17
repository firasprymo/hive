package com.vermeg.services.questions;
import com.vermeg.entities.Questions;

import java.util.List;
import java.util.Optional;

public interface QuestionService {

    List<Questions> getAllQuestions();

    Optional<Questions> getQuestionById(Long id);

    List<Questions> searchQuestions(String keyword);

    Questions saveQuestion(Questions question);

    Questions updateQuestion(Long id, Questions updatedQuestion);

    void deleteQuestion(Long id);

    Questions upVoteQuestion(Long questionId);

    Questions downVoteQuestion(Long questionId);
}
