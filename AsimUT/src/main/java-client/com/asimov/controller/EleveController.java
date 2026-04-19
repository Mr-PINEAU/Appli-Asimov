package com.asimov.controller;

import com.asimov.model.EleveModel;
import com.asimov.service.EleveService;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.fxml.FXML;
import javafx.scene.control.*;

public class EleveController {

    @FXML private TableView<EleveModel> tableEleves;
    @FXML private TableColumn<EleveModel, String> colNumeroEleve;
    @FXML private TableColumn<EleveModel, String> colDateInscription;
    @FXML private TableColumn<EleveModel, String> colActif;
    @FXML private TableColumn<EleveModel, String> colAnneeScolaire;
    @FXML private TableColumn<EleveModel, Boolean> colRedoublant;



    @FXML private TextField numeroEleveField;
    @FXML private TextField dateInscriptionField;
    @FXML private TextField actifField;
    @FXML private TextField anneeScolaireField;
    @FXML private Boolean redoublantField;

    private final EleveService service = new EleveService();


    @FXML
    private void initialize() {
        colNumeroEleve.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getNumeroEleve()));
        colDateInscription.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getDateInscription()));
        colActif.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getActif()));
        colAnneeScolaire.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().getAnneeScolaire()));
        colRedoublant.setCellValueFactory(data -> new SimpleBooleanProperty(data.getValue().getRedoublant()));

        // Quand on clique sur un élève → remplir les champs
        tableEleves.getSelectionModel().selectedItemProperty().addListener((obs, oldVal, newVal) -> {
            if (newVal != null) {
                numeroEleveField.setText(newVal.getNumeroEleve());
                dateInscriptionField.setText(newVal.getDateInscription());
                actifField.setText(newVal.getActif());
                anneeScolaireField.setText(newVal.getAnneeScolaire());
                redoublantCheckBox.isSelected();


            }
        });
    }

    @FXML
    private void charger() {
        tableEleves.getItems().setAll((EleveModel) service.getAll());
    }

    @FXML
    public void ajouter() {
        EleveModel e = new EleveModel(
                numeroEleveField.getText(),
                dateInscriptionField.getText(),
                actifField.getText(),
                anneeScolaireField.getText(),
                redoublantCheckBox.isSelected()


        );

        service.ajouter(e);
        charger();
        clearFields();
    }

    @FXML
    private CheckBox redoublantCheckBox;

    @FXML
    public void modifier() {
        EleveModel selected = tableEleves.getSelectionModel().getSelectedItem();

        if (selected != null) {
            selected.setNumeroEleve(numeroEleveField.getText());
            selected.setDateInscription(dateInscriptionField.getText());
            selected.setActif(actifField.getText());
            selected.setAnneeScolaire(anneeScolaireField.getText());
            selected.setRedoublant(redoublantCheckBox.isSelected());


            service.modifier(selected);
            charger();
        }
    }

    @FXML
    public void supprimer() {
        EleveModel selected = tableEleves.getSelectionModel().getSelectedItem();

        if (selected != null) {
            service.supprimer(selected.getIdEleve());
            charger();
        }
    }

    private void clearFields() {
        numeroEleveField.clear();
        dateInscriptionField.clear();
        actifField.clear();
        anneeScolaireField.clear();
        redoublantField.booleanValue();

    }
}
