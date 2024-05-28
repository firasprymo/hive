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

    @GetMapping("")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.getQuestionById(id));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok().build();

    }

    @PatchMapping("/add-reponse-question/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id, @RequestBody Reponse reponse) {
        return ResponseEntity.ok(questionService.addReponseQuestion(id, reponse));
    }


    @PostMapping("/add-question")
    public ResponseEntity<Question> createQuestion(@RequestBody QuestionDTO questionDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(questionService.saveQuestion(questionDTO));
    }

    @PatchMapping("/")
    public ResponseEntity<Question> editQuestion(@RequestBody QuestionDTO questionDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(questionService.updateQuestion(questionDTO));
    }

    // Helper method to convert QuestionDTO to Questions entity


    @PatchMapping("/vote_up_question")
    public ResponseEntity<?> upvoteQuestion(@RequestBody Question question) {
        Question updatedQuestion = questionService.upVoteQuestion(question);
        return ResponseEntity.ok(updatedQuestion);
    }

    @PatchMapping("/vote_down_question")
    public ResponseEntity<?> downvoteQuestion(@RequestBody Question question) {
        Question updatedQuestion = questionService.downVoteQuestion(question);
        return ResponseEntity.ok(updatedQuestion);
    }
}
