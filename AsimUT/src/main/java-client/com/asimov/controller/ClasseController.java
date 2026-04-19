package com.asimov.controller;

import com.asimov.model.ClasseModel;
import com.asimov.service.ClasseService;
import javafx.beans.property.SimpleStringProperty;
import javafx.fxml.FXML;
import javafx.scene.control.*;

public class ClasseController {

    @FXML private TableView<ClasseModel> tableClasses;
    @FXML private TableColumn<ClasseModel, String> colNiveau;
    @FXML private TableColumn<ClasseModel, String> colLibelle;

    @FXML private TextField niveauField;
    @FXML private TextField libelleField;

    private final ClasseService service = new ClasseService();

    @FXML
    private void initialize() {
        colNiveau.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getNiveau()));
        colLibelle.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getLibelle()));

        // Sélection dans le tableau → remplit les champs
        tableClasses.getSelectionModel().selectedItemProperty().addListener((obs, oldVal, newVal) -> {
            if (newVal != null) {
                niveauField.setText(newVal.getNiveau());
                libelleField.setText(newVal.getLibelle());
            }
        });

        charger();
    }

    @FXML
    private void charger() {
        tableClasses.getItems().setAll(service.getAll());
    }

    @FXML
    public void ajouter() {
        ClasseModel c = new ClasseModel(
                niveauField.getText(),
                libelleField.getText()
        );
        service.ajouter(c);
        charger();
        clearFields();
    }

    @FXML
    public void modifier() {
        ClasseModel selected = tableClasses.getSelectionModel().getSelectedItem();
        if (selected != null) {
            selected.setNiveau(niveauField.getText());
            selected.setLibelle(libelleField.getText());
            service.modifier(selected);
            charger();
        }
    }

    @FXML
    public void supprimer() {
        ClasseModel selected = tableClasses.getSelectionModel().getSelectedItem();
        if (selected != null) {
            service.supprimer(selected.getId_classe());
            charger();
        }
    }

    private void clearFields() {
        niveauField.clear();
        libelleField.clear();
    }
}
