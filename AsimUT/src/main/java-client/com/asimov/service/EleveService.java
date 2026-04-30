package com.asimov.service;

import com.asimov.model.EleveModel;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.asimov.api.ApiClient;

import java.util.List;

public class EleveService {

    private final ApiClient api;  // ← plus d'initialisation ici
    private final ObjectMapper mapper = new ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    // ← constructeur qui gère l'exception
    public EleveService() {
        try {
            this.api = new ApiClient();
        } catch (Exception e) {
            throw new RuntimeException("Impossible d'initialiser ApiClient", e);
        }
    }

    public List<EleveModel> getAll() {
        try {
            String json = api.get("/api/eleves");
            System.out.println("=== RÉPONSE /api/eleves ===");
            System.out.println(json);
            return mapper.readValue(json, new TypeReference<List<EleveModel>>() {});
        } catch (Exception e) {
            System.out.println("=== ERREUR getAll ===");
            System.out.println(e.getMessage()); // ← voir l'erreur exacte
            e.printStackTrace();
            return List.of();
        }
    }

    public void ajouter(EleveModel eleve) {
        try {
            String json = mapper.writeValueAsString(eleve);
            System.out.println("=== POST /api/eleves ===");
            System.out.println("JSON envoyé : " + json);
            String reponse = api.post("/api/eleves", json);
            System.out.println("Réponse : " + reponse);
        } catch (Exception e) {
            System.out.println("ERREUR ajouter : " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void modifier(EleveModel eleve) {
        try {
            String json = mapper.writeValueAsString(eleve);
            System.out.println("=== PUT /api/eleves/" + eleve.getIdEleve() + " ===");
            System.out.println("JSON envoyé : " + json);
            String reponse = api.put("/api/eleves/" + eleve.getIdEleve(), json);
            System.out.println("Réponse : " + reponse);
        } catch (Exception e) {
            System.out.println("ERREUR modifier : " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void supprimer(int id) {
        try {
            System.out.println("=== DELETE /api/eleves/" + id + " ===");
            String reponse = api.delete("/api/eleves/" + id);
            System.out.println("Réponse : " + reponse);
        } catch (Exception e) {
            System.out.println("ERREUR supprimer : " + e.getMessage());
            e.printStackTrace();
        }
    }
}