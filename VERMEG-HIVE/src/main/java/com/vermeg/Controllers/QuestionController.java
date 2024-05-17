package com.vermeg.Controllers;

import com.vermeg.dtos.QuestionDTO;
import com.vermeg.entities.Questions;
import com.vermeg.services.questions.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public ResponseEntity<List<Questions>> getAllQuestions() {
        List<Questions> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Questions> getQuestionById(@PathVariable Long id) {
        Optional<Questions> optionalQuestion = questionService.getQuestionById(id);
        if (optionalQuestion.isPresent()) {
            Questions question = optionalQuestion.get();
            return ResponseEntity.ok(question);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public ResponseEntity<Questions> createQuestion(@RequestBody QuestionDTO questionDTO) {
        // Convert QuestionDTO to Questions entity
        Questions question = convertToEntity(questionDTO);

        // Save the converted entity
        Questions savedQuestion = questionService.saveQuestion(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedQuestion);
    }

    // Helper method to convert QuestionDTO to Questions entity
    private Questions convertToEntity(QuestionDTO questionDTO) {
        Questions question = new Questions();
        question.setTitle(questionDTO.getTitle());
        question.setContent(questionDTO.getContent());
        // Set other fields if needed

        return question;
    }


    @PostMapping("/{questionId}/upvote")
    public ResponseEntity<?> upvoteQuestion(@PathVariable Long questionId) {
        Questions updatedQuestion = questionService.upVoteQuestion(questionId);
        if (updatedQuestion != null) {
            return ResponseEntity.ok(updatedQuestion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{questionId}/downvote")
    public ResponseEntity<?> downvoteQuestion(@PathVariable Long questionId) {
        Questions updatedQuestion = questionService.downVoteQuestion(questionId);
        if (updatedQuestion != null) {
            return ResponseEntity.ok(updatedQuestion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
