package com.asimov.controller;

import com.asimov.model.ConventionModel;
import com.asimov.service.ConventionService;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.fxml.FXML;
import javafx.scene.control.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class ConventionController {

    @FXML private TableView<ConventionModel> tableConventions;
    @FXML private TableColumn<ConventionModel, String> colEntreprise;
    @FXML private TableColumn<ConventionModel, String> colTuteur;
    @FXML private TableColumn <ConventionModel, String> colAdresse;
    @FXML private TableColumn <ConventionModel, String> colTelephone;
    @FXML private TableColumn<ConventionModel, String> colEmail;
    @FXML private TableColumn<ConventionModel, String> colDateDebut;
    @FXML private TableColumn<ConventionModel, String> colDateFin;
    @FXML private TableColumn<ConventionModel, String> colStatut;
    @FXML private TableColumn<ConventionModel, Boolean> colSignature;

    @FXML private TextField entrepriseField;
    @FXML private TextField tuteurField;
    @FXML private TextField adresseField;
    @FXML private TextField telephoneField;
    @FXML private TextField emailField;
    @FXML private TextField idStageField;
    @FXML private TextField idEleveField;
    @FXML private TextField idProfesseurReferentField;
    @FXML private DatePicker dateDebutField;
    @FXML private DatePicker dateFinField;
    @FXML private CheckBox signatureCheckBox;

    private final ConventionService service = new ConventionService();
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @FXML
    private void initialize() {
        colEntreprise.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getEntreprise()));
        colTuteur.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getTuteur()));
        colDateDebut.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getDateDebut()));
        colDateFin.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getDateFin()));
        colStatut.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getStatut()));
        colSignature.setCellValueFactory(data -> new SimpleBooleanProperty(data.getValue().getSignature()));

        // Sélection dans le tableau → remplit les champs
        tableConventions.getSelectionModel().selectedItemProperty().addListener((obs, oldVal, newVal) -> {
            if (newVal != null) {
                entrepriseField.setText(newVal.getEntreprise());
                tuteurField.setText(newVal.getTuteur());
                adresseField.setText(newVal.getAdresse());
                telephoneField.setText(newVal.getTelephone());
                emailField.setText(newVal.getEmail());
                idStageField.setText(String.valueOf(newVal.getIdStage()));
                idEleveField.setText(String.valueOf(newVal.getIdEleve()));
                idProfesseurReferentField.setText(String.valueOf(newVal.getIdProfesseurReferent()));
                dateDebutField.setValue(LocalDate.parse(newVal.getDateDebut(), formatter));
                dateFinField.setValue(LocalDate.parse(newVal.getDateFin(), formatter));
                signatureCheckBox.setSelected(newVal.getSignature());
            }
        });

        charger();
    }

    @FXML
    private void charger() {
        tableConventions.getItems().setAll(service.getAll());
    }

    @FXML
    public void ajouter() {
        ConventionModel c = new ConventionModel(
                entrepriseField.getText(),
                tuteurField.getText(),
                adresseField.getText(),
                telephoneField.getText(),
                emailField.getText(),
                dateDebutField.getValue().format(formatter),
                dateFinField.getValue().format(formatter),
                Integer.parseInt(idStageField.getText()),
                Integer.parseInt(idEleveField.getText()),
                Integer.parseInt(idProfesseurReferentField.getText())
        );
        service.ajouter(c);
        charger();
        clearFields();
    }

    @FXML
    public void modifier() {
        ConventionModel selected = tableConventions.getSelectionModel().getSelectedItem();
        if (selected != null && "EN_ATTENTE".equals(selected.getStatut())) {
            selected.setEntreprise(entrepriseField.getText());
            selected.setTuteur(tuteurField.getText());
            selected.setAdresse(adresseField.getText());
            selected.setTelephone(telephoneField.getText());
            selected.setEmail(emailField.getText());
            selected.setDateDebut(dateDebutField.getValue().format(formatter));
            selected.setDateFin(dateFinField.getValue().format(formatter));
            selected.setIdStage(Integer.parseInt(idStageField.getText()));
            selected.setIdEleve(Integer.parseInt(idEleveField.getText()));
            selected.setIdProfesseurReferent(Integer.parseInt(idProfesseurReferentField.getText()));
            service.modifier(selected);
            charger();
        } else {
            System.out.println("Modification impossible : convention déjà validée.");
        }
    }

    @FXML
    public void valider() {
        ConventionModel selected = tableConventions.getSelectionModel().getSelectedItem();
        if (selected != null && "EN_ATTENTE".equals(selected.getStatut())) {
            service.valider(selected.getIdConvention());
            charger();
        } else {
            System.out.println("Aucune convention en attente sélectionnée.");
        }
    }

    @FXML
    public void supprimer() {
        ConventionModel selected = tableConventions.getSelectionModel().getSelectedItem();
        if (selected != null) {
            service.supprimer(selected.getIdConvention());
            charger();
        }
    }

    private void clearFields() {
        entrepriseField.clear();
        tuteurField.clear();
        adresseField.clear();
        telephoneField.clear();
        emailField.clear();
        idStageField.clear();
        idEleveField.clear();
        idProfesseurReferentField.clear();
        dateDebutField.setValue(null);
        dateFinField.setValue(null);
        signatureCheckBox.setSelected(false);
    }
}