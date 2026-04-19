package com.asimov.controller;


import com.asimov.model.ClasseModel;
import com.asimov.model.ProfesseurModel;
import com.asimov.service.ProfesseurService;
import javafx.beans.property.SimpleStringProperty;
import javafx.fxml.FXML;
import javafx.scene.control.*;



public class ProfesseurController {

    @FXML private TableView<ProfesseurModel> tableProfesseur;
    @FXML private TableColumn<ProfesseurModel, String> colMatricule;
    @FXML private TableColumn<ProfesseurModel, String> colSpecialite;
    @FXML private TableColumn<ProfesseurModel, String> colDateEmbauche;



    @FXML private TextField matriculeField;
    @FXML private TextField specialiteField;
    @FXML private TextField dateEmbaucheField;

    private final ProfesseurService service = new ProfesseurService();

    @FXML
    private void initialize() {
        colMatricule.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getMatricule()));
        colSpecialite.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getSpecialite()));
        colDateEmbauche.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getDateEmbauche()));

        // Sélection dans le tableau → remplit les champs
        tableProfesseur.getSelectionModel().selectedItemProperty().addListener((obs, oldVal, newVal) -> {
            if (newVal != null) {
                matriculeField.setText(newVal.getMatricule());
                specialiteField.setText(newVal.getSpecialite());
                dateEmbaucheField.setText(newVal.getDateEmbauche());

            }
        });

        charger();
    }

    @FXML
    private void charger() {
        tableProfesseur.getItems().setAll(service.getAll());
    }

    @FXML
    public void ajouter() {
        ProfesseurModel c = new ProfesseurModel(
                matriculeField.getText(),
                specialiteField.getText(),
                dateEmbaucheField.getText()
        );
        service.ajouter(c);
        charger();
        clearFields();
    }

    @FXML
    public void modifier() {
        ProfesseurModel selected = tableProfesseur.getSelectionModel().getSelectedItem();
        if (selected != null) {
            selected.setMatricule(matriculeField.getText());
            selected.setSpecialite(specialiteField.getText());
            selected.setDateEmbauche(dateEmbaucheField.getText());


            service.modifier(selected);
            charger();
        }
    }

    @FXML
    public void supprimer() {
        ProfesseurModel selected = tableProfesseur.getSelectionModel().getSelectedItem();
        if (selected != null) {
            service.supprimer(selected.getIdProfesseur());
            charger();
        }
    }

    private void clearFields() {
       matriculeField.clear();
       specialiteField.clear();
       dateEmbaucheField.clear();
    }

}
