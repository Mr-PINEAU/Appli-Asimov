package com.asimov.service;

import com.asimov.api.ApiClient;
import com.asimov.model.ClasseModel;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;


public class ClasseService {

    private final ApiClient api ;
    private final ObjectMapper mapper = new ObjectMapper();

    // ← constructeur qui gère l'exception
    public ClasseService() {
        try {
            this.api = new ApiClient();
        } catch (Exception e) {
            throw new RuntimeException("Impossible d'initialiser ApiClient", e);
        }
    }

    public List<ClasseModel> getAll() {
        try {
            String json = api.get("/api/classes");
            return mapper.readValue(json, new TypeReference<List<ClasseModel>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public void ajouter(ClasseModel classe) {
        try {
            String json = mapper.writeValueAsString(classe);
            api.post("/api/classes", json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void modifier(ClasseModel classe) {
        try {
            String json = mapper.writeValueAsString(classe);
            api.put("/api/classes/" + classe.getId_classe(), json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void supprimer(int id) {
        try {
            api.delete("/api/classes/" + id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
