package com.asimov.controller;

import com.asimov.model.Eleve;
import com.asimov.service.EleveService;
import javafx.fxml.FXML;
import javafx.scene.control.*;

public class EleveController {

    @FXML private TableView<Eleve> tableEleves;
    @FXML private TableColumn<Eleve, String> colNumeroEleve;
    @FXML private TableColumn<Eleve, String> colDateInscription;
    @FXML private TableColumn<Eleve, String> colActif;
    @FXML private TableColumn<Eleve, String> colAnneeScolaire;
    @FXML private TableColumn<Eleve, Boolean> colRedoublant;



    @FXML private TextField numeroEleveField;
    @FXML private TextField dateInscriptionField;
    @FXML private TextField actifField;
    @FXML private TextField anneeScolaireField;
    @FXML private TextField redoublantField;

    private final EleveService service = new EleveService();

    @FXML
    public void initialize() {
        colNumeroEleve.setCellValueFactory(data -> new javafx.beans.property.SimpleStringProperty(data.getValue().getNumeroEleve()));
        colDateInscription.setCellValueFactory(data -> new javafx.beans.property.SimpleStringProperty(data.getValue().getDateInscription()));
        colActif.setCellValueFactory(data -> new javafx.beans.property.SimpleStringProperty(data.getValue().getActif()));
        colAnneeScolaire.setCellValueFactory(data -> new javafx.beans.property.SimpleStringProperty(data.getValue().getAnneeScolaire()));
        colRedoublant.setCellValueFactory(data -> new javafx.beans.property.SimpleStringProperty(data.getValue().getRedoublant()));

        // Quand on clique sur un élève → remplir les champs
        tableEleves.getSelectionModel().selectedItemProperty().addListener((obs, oldVal, newVal) -> {
            if (newVal != null) {
                numeroEleveField.setText(newVal.getNumeroEleve());
                dateInscriptionField.setText(newVal.getDateInscription());
                actifField.setText(newVal.getActif());
                anneeScolaireField.setText(newVal.getAnneeScolaire());
                redoublantField.setText(newVal.getRedoublant());


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
                numeroEleveField.getText(),
                dateInscriptionField.getText(),
                actifField.getText(),
                anneeScolaireField.getText(),
                redoublantField.getBoolean()


        );

        service.ajouter(e);
        charger();
        clearFields();
    }

    @FXML
    private void modifier() {
        Eleve selected = tableEleves.getSelectionModel().getSelectedItem();

        if (selected != null) {
            selected.setNumeroEleve(numeroEleveField.getText());
            selected.setDateInscription(dateInscriptionField.getText());
            selected.setActif(actifField.getText());
            selected.setAnneeScolaire(anneeScolaireField.getText());
            selected.setRedoublant(redoublantField.getText());

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
