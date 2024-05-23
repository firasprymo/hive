package com.vermeg.Controllers;

import com.vermeg.dtos.QuestionDTO;
import com.vermeg.entities.Question;
import com.vermeg.entities.Reponse;
import com.vermeg.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/questions")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        Optional<Question> optionalQuestion = questionService.getQuestionById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            return ResponseEntity.ok(question);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/add-reponse-question/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id, @RequestBody Reponse reponse) {
        return ResponseEntity.ok(questionService.addReponseQuestion(id, reponse));
    }


    @PostMapping("/add-question")
    public ResponseEntity<Question> createQuestion(@RequestBody QuestionDTO questionDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(questionService.saveQuestion(questionDTO));
    }

    // Helper method to convert QuestionDTO to Questions entity


    @PostMapping("/{questionId}/upvote")
    public ResponseEntity<?> upvoteQuestion(@PathVariable Long questionId) {
        Question updatedQuestion = questionService.upVoteQuestion(questionId);
        if (updatedQuestion != null) {
            return ResponseEntity.ok(updatedQuestion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{questionId}/downvote")
    public ResponseEntity<?> downvoteQuestion(@PathVariable Long questionId) {
        Question updatedQuestion = questionService.downVoteQuestion(questionId);
        if (updatedQuestion != null) {
            return ResponseEntity.ok(updatedQuestion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
