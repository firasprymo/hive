package com.vermeg.Controllers;

import com.vermeg.dtos.ReponseDTO;
import com.vermeg.entities.Reponse;
import com.vermeg.services.ReponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reponses")
public class ReponseController {

    private final ReponseService reponseService;

    @Autowired
    public ReponseController(ReponseService reponseService) {
        this.reponseService = reponseService;
    }

    @GetMapping
    public ResponseEntity<List<Reponse>> getAllReponses() {
        List<Reponse> reponses = reponseService.getAllReponses();
        return ResponseEntity.ok(reponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reponse> getReponseById(@PathVariable Long id) {
        return ResponseEntity.ok(reponseService.getReponseById(id));

    }

    @PostMapping("/add-reponse")
    public ResponseEntity<Reponse> createReponse(@RequestBody ReponseDTO reponseDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reponseService.saveReponse(reponseDTO));
    }
    @PatchMapping("/")
    public ResponseEntity<Reponse> updateReponse(@RequestBody ReponseDTO reponseDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reponseService.updateReponse(reponseDTO));
    }

    @DeleteMapping("/remove-reponse/{id}")
    public ResponseEntity<Void> deleteReponse(@PathVariable("id") Long id) {
        reponseService.deleteReponse(id);
        return ResponseEntity.ok().build();
    }
}
