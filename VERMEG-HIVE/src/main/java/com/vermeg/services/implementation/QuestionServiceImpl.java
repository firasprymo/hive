package com.vermeg.services.implementation;

import com.vermeg.dtos.QuestionDTO;
import com.vermeg.entities.AppUser;
import com.vermeg.entities.Question;
import com.vermeg.entities.Reponse;
import com.vermeg.repositories.QuestionRepository;
import com.vermeg.repositories.ReponseRepository;
import com.vermeg.services.QuestionService;
import com.vermeg.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final ReponseRepository reponseRepository;
    private final UserService userService;

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    @Override
    public List<Question> searchQuestions(String keyword) {
        return questionRepository.findByTitleContainingIgnoreCase(keyword);
    }

    @Override
    public Question saveQuestion(QuestionDTO questionDTO) {
        Question question = convertToEntity(questionDTO);

        AppUser user = userService.getUser();
        question.setUser(user);
        return questionRepository.save(question);
    }

    @Override
    public Question addReponseQuestion(Long id, Reponse reponseDTO) {
        Optional<Question> questionOptional = questionRepository.findById(id);
        if (questionOptional.isEmpty()) {
            throw new IllegalArgumentException("Question unvaillable");
        }
        Question question = questionOptional.get();
        Reponse reponse = Reponse.builder()
                .content(reponseDTO.getContent())
                .createdAt(LocalDateTime.now())
                .build();
        reponse = reponseRepository.save(reponse);
        question.getReponses().add(reponse);
        return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Long id, Question updatedQuestion) {
        Optional<Question> existingQuestion = questionRepository.findById(id);
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
    public Question upVoteQuestion(Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            question.setUpVotes(question.getUpVotes() + 1);
            return questionRepository.save(question);
        }
        return null; // Handle not found scenario appropriately
    }

    @Override
    public Question downVoteQuestion(Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            question.setDownVotes(question.getDownVotes() + 1);
            return questionRepository.save(question);
        }
        return null; // Handle not found scenario appropriately
    }

    private Question convertToEntity(QuestionDTO questionDTO) {
        Question question = new Question();
        question.setTitle(questionDTO.getTitle());
        question.setContent(questionDTO.getContent());
        question.setPriority(questionDTO.getPriority());
        // Set other fields if needed

        return question;
    }
}
