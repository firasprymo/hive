package com.vermeg.services.questions;

import com.vermeg.entities.Questions;
import com.vermeg.repositories.QuestionRepository;
import com.vermeg.services.questions.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionServiceImpl(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public List<Questions> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Optional<Questions> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    @Override
    public List<Questions> searchQuestions(String keyword) {
        return questionRepository.findByTitleContainingIgnoreCase(keyword);
    }

    @Override
    public Questions saveQuestion(Questions question) {
        return questionRepository.save(question);
    }

    @Override
    public Questions updateQuestion(Long id, Questions updatedQuestion) {
        Optional<Questions> existingQuestion = questionRepository.findById(id);
        if (existingQuestion.isPresent()) {
            updatedQuestion.setId(id);
            return questionRepository.save(updatedQuestion);
        }
        return null; // Handle not found scenario appropriately
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    @Override
    public Questions upVoteQuestion(Long questionId) {
        Optional<Questions> optionalQuestion = questionRepository.findById(questionId);
        if (optionalQuestion.isPresent()) {
            Questions question = optionalQuestion.get();
            question.setUpVotes(question.getUpVotes() + 1);
            return questionRepository.save(question);
        }
        return null; // Handle not found scenario appropriately
    }

    @Override
    public Questions downVoteQuestion(Long questionId) {
        Optional<Questions> optionalQuestion = questionRepository.findById(questionId);
        if (optionalQuestion.isPresent()) {
            Questions question = optionalQuestion.get();
            question.setDownVotes(question.getDownVotes() + 1);
            return questionRepository.save(question);
        }
        return null; // Handle not found scenario appropriately
    }
}
