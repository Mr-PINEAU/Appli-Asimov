package com.asimov.controller;

import com.asimov.model.Eleve;
import com.asimov.service.EleveService;
import javafx.fxml.FXML;
import javafx.scene.control.*;

public class EleveController {

    @FXML private TableView<Eleve> tableEleves;
    @FXML private TableColumn<Eleve, String> colNom;
    @FXML private TableColumn<Eleve, String> colPrenom;
    @FXML private TableColumn<Eleve, String> colClasse;

    @FXML private TextField nomField;
    @FXML private TextField prenomField;
    @FXML private TextField classeField;

    private final EleveService service = new EleveService();

    @FXML
    public void initialize() {
        colNom.setCellValueFactory(data -> new javafx.beans.property.SimpleStringProperty(data.getValue().getNom()));
        colPrenom.setCellValueFactory(data -> new javafx.beans.property.SimpleStringProperty(data.getValue().getPrenom()));
        colClasse.setCellValueFactory(data -> new javafx.beans.property.SimpleStringProperty(data.getValue().getClasse()));

        // Quand on clique sur un élève → remplir les champs
        tableEleves.getSelectionModel().selectedItemProperty().addListener((obs, oldVal, newVal) -> {
            if (newVal != null) {
                nomField.setText(newVal.getNom());
                prenomField.setText(newVal.getPrenom());
                classeField.setText(newVal.getClasse());
            }
        });
    }

    @FXML
    private void charger() {
        tableEleves.getItems().setAll(service.getAll());
    }

    @FXML
    private void ajouter() {
        Eleve e = new Eleve(
                nomField.getText(),
                prenomField.getText(),
                classeField.getText()
        );

        service.ajouter(e);
        charger();
        clearFields();
    }

    @FXML
    private void modifier() {
        Eleve selected = tableEleves.getSelectionModel().getSelectedItem();

        if (selected != null) {
            selected.setNom(nomField.getText());
            selected.setPrenom(prenomField.getText());
            selected.setClasse(classeField.getText());

            service.modifier(selected);
            charger();
        }
    }

    @FXML
    private void supprimer() {
        Eleve selected = tableEleves.getSelectionModel().getSelectedItem();

        if (selected != null) {
            service.supprimer(selected.getId());
            charger();
        }
    }

    private void clearFields() {
        nomField.clear();
        prenomField.clear();
        classeField.clear();
    }
}
