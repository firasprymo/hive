package com.vermeg.services;
import com.vermeg.dtos.QuestionDTO;
import com.vermeg.entities.Question;
import com.vermeg.entities.Reponse;

import java.util.List;
import java.util.Optional;

public interface QuestionService {

    List<Question> getAllQuestions();

    Optional<Question> getQuestionById(Long id);

    List<Question> searchQuestions(String keyword);

    Question saveQuestion(QuestionDTO question);
    Question addReponseQuestion(Long id, Reponse reponse);

    Question updateQuestion(Long id, Question updatedQuestion);

    void deleteQuestion(Long id);

    Question upVoteQuestion(Long questionId);

    Question downVoteQuestion(Long questionId);
}
