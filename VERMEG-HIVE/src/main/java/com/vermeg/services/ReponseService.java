package com.vermeg.services;

import com.vermeg.dtos.ReponseDTO;
import com.vermeg.entities.Reponse;

import java.util.List;

public interface ReponseService {

    List<Reponse> getAllReponses();

    Reponse getReponseById(Long id);


    Reponse saveReponse(ReponseDTO reponse);

    Reponse updateReponse(ReponseDTO updatedReponse);

    void deleteReponse(Long id);
}
