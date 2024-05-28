package com.vermeg.services.implementation;

import com.vermeg.dtos.QuestionDTO;
import com.vermeg.dtos.ReponseDTO;
import com.vermeg.entities.AppUser;
import com.vermeg.entities.Question;
import com.vermeg.entities.Reponse;
import com.vermeg.repositories.ReponseRepository;
import com.vermeg.services.ReponseService;
import com.vermeg.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReponseServiceImpl implements ReponseService {

    private final ReponseRepository reponseRepository;
    private final UserService userService;

    @Override
    public List<Reponse> getAllReponses() {
        return reponseRepository.findAll();
    }

    @Override
    public Reponse getReponseById(Long id) {
        return reponseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reponse not found with id: " + id));
    }


    @Override
    public Reponse saveReponse(ReponseDTO reponseDTO) {
        Reponse reponse = convertToEntity(reponseDTO);

        AppUser user = userService.getUser();
        reponse.setUser(user);
        return reponseRepository.save(reponse);
    }


    @Override
    public Reponse updateReponse(ReponseDTO updatedReponse) {
        Optional<Reponse> existingReponse = reponseRepository.findById(updatedReponse.getId());
        if (existingReponse.isPresent()) {
            Reponse questionFinal = existingReponse.get();
            questionFinal.setContent(updatedReponse.getContent());
            return reponseRepository.save(questionFinal);
        }
        return null; // Handle not found scenario appropriately
    }

    @Override
    public void deleteReponse(Long id) {
        reponseRepository.deleteById(id);
    }


    private Reponse convertToEntity(ReponseDTO reponseDTO) {
        Reponse reponse = new Reponse();
        reponse.setContent(reponseDTO.getContent());
        return reponse;
    }
}
