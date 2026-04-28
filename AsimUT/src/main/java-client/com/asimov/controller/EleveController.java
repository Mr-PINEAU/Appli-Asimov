package com.asimov.controller;

import com.asimov.model.EleveModel;
import com.asimov.service.EleveService;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.VBox;

import java.util.List;
import java.util.stream.Collectors;

public class EleveController {

    // --- Tableau ---
    @FXML private TableView<EleveModel> tableEleves;
    @FXML private TableColumn<EleveModel, Integer> colId;
    @FXML private TableColumn<EleveModel, String>  colNumero;
    @FXML private TableColumn<EleveModel, Integer> colIdClasse;
    @FXML private TableColumn<EleveModel, String>  colDateInscription;
    @FXML private TableColumn<EleveModel, String>  colAnneeScolaire;
    @FXML private TableColumn<EleveModel, String>  colStatut;
    @FXML private TableColumn<EleveModel, Boolean> colRedoublant;

    // --- Formulaire ---
    @FXML private VBox panneauForm;
    @FXML private Label titreForm;
    @FXML private TextField fieldNumero;
    @FXML private TextField fieldIdClasse;
    @FXML private TextField fieldDateInscription;
    @FXML private TextField fieldAnneeScolaire;
    @FXML private ComboBox<String> comboActif;
    @FXML private CheckBox checkRedoublant;
    @FXML private Label labelStatus;

    // --- Recherche ---
    @FXML private TextField searchField;

    private final EleveService eleveService = new EleveService();
    private ObservableList<EleveModel> listeEleves = FXCollections.observableArrayList();
    private EleveModel eleveEnCoursModification = null;

    @FXML
    public void initialize() {
        // Liaison colonnes <-> propriétés du modèle
        colId.setCellValueFactory(new PropertyValueFactory<>("idEleve"));
        colNumero.setCellValueFactory(new PropertyValueFactory<>("numeroEleve"));
        colIdClasse.setCellValueFactory(new PropertyValueFactory<>("idClasse"));
        colDateInscription.setCellValueFactory(new PropertyValueFactory<>("dateInscription"));
        colAnneeScolaire.setCellValueFactory(new PropertyValueFactory<>("anneeScolaire"));
        colStatut.setCellValueFactory(new PropertyValueFactory<>("actif"));
        colRedoublant.setCellValueFactory(new PropertyValueFactory<>("redoublant"));

        comboActif.setItems(FXCollections.observableArrayList("oui", "non"));

        chargerEleves();
    }

    @FXML
    public void chargerEleves() {
        List<EleveModel> eleves = eleveService.getAll();
        listeEleves = FXCollections.observableArrayList(eleves);
        tableEleves.setItems(listeEleves);
        labelStatus.setText("✅ " + eleves.size() + " élève(s) chargé(s)");
    }

    @FXML
    public void rechercherEleve() {
        String terme = searchField.getText().toLowerCase();
        List<EleveModel> filtres = listeEleves.stream()
                .filter(e -> e.getNumeroEleve().toLowerCase().contains(terme)
                        || String.valueOf(e.getIdClasse()).contains(terme)
                        || e.getAnneeScolaire().toLowerCase().contains(terme))
                .collect(Collectors.toList());
        tableEleves.setItems(FXCollections.observableArrayList(filtres));
    }

    @FXML
    public void ouvrirFormAjout() {
        eleveEnCoursModification = null;
        titreForm.setText("➕ Ajouter un élève");
        viderFormulaire();
        afficherFormulaire(true);
    }

    @FXML
    public void ouvrirFormModifier() {
        EleveModel selectionne = tableEleves.getSelectionModel().getSelectedItem();
        if (selectionne == null) {
            labelStatus.setStyle("-fx-text-fill: #e74c3c;");
            labelStatus.setText("⚠️ Sélectionnez un élève à modifier.");
            return;
        }
        eleveEnCoursModification = selectionne;
        titreForm.setText("✏️ Modifier l'élève");

        fieldNumero.setText(selectionne.getNumeroEleve());
        fieldIdClasse.setText(String.valueOf(selectionne.getIdClasse()));
        fieldDateInscription.setText(selectionne.getDateInscription());
        fieldAnneeScolaire.setText(selectionne.getAnneeScolaire());
        comboActif.setValue(selectionne.getActif());
        checkRedoublant.setSelected(selectionne.getRedoublant() == 1);

        afficherFormulaire(true);
    }

    @FXML
    public void enregistrerEleve() {
        if (fieldNumero.getText().isEmpty()) {
            labelStatus.setStyle("-fx-text-fill: #e74c3c;");
            labelStatus.setText("⚠️ Le numéro élève est obligatoire.");
            return;
        }

        String numero = fieldNumero.getText();
        int idClasse = Integer.parseInt(fieldIdClasse.getText().isEmpty() ? "0" : fieldIdClasse.getText());
        String date = fieldDateInscription.getText();
        String annee = fieldAnneeScolaire.getText();
        String actif = comboActif.getValue() != null ? comboActif.getValue() : "non";
        int redoublant = checkRedoublant.isSelected() ? 1 : 0;

        System.out.println("=== ENREGISTRER ===");
        System.out.println("Mode : " + (eleveEnCoursModification == null ? "AJOUT" : "MODIFICATION"));
        System.out.println("Numero: " + numero + " | Classe: " + idClasse);


        if (eleveEnCoursModification == null) {
            // AJOUT
            EleveModel nouvelEleve = new EleveModel(0, idClasse, numero, date, actif, annee, redoublant);
            eleveService.ajouter(nouvelEleve);
            labelStatus.setStyle("-fx-text-fill: #27ae60;");
            labelStatus.setText("✅ Élève ajouté avec succès !");
        } else {
            // MODIFICATION
            eleveEnCoursModification.setNumeroEleve(numero);
            eleveEnCoursModification.setIdClasse(idClasse);
            eleveEnCoursModification.setDateInscription(date);
            eleveEnCoursModification.setAnneeScolaire(annee);
            eleveEnCoursModification.setActif(actif);
            eleveEnCoursModification.setRedoublant(redoublant);
            eleveService.modifier(eleveEnCoursModification);
            labelStatus.setStyle("-fx-text-fill: #27ae60;");
            labelStatus.setText("✅ Élève modifié avec succès !");
        }

        afficherFormulaire(false);
        chargerEleves();

    }

    @FXML
    public void supprimerEleve() {
        EleveModel selectionne = tableEleves.getSelectionModel().getSelectedItem();
        if (selectionne == null) {
            labelStatus.setStyle("-fx-text-fill: #e74c3c;");
            labelStatus.setText("⚠️ Sélectionnez un élève à supprimer.");
            return;
        }

        Alert confirm = new Alert(Alert.AlertType.CONFIRMATION);
        confirm.setTitle("Confirmation");
        confirm.setHeaderText("Supprimer l'élève ?");
        confirm.setContentText("Cette action est irréversible.");

        confirm.showAndWait().ifPresent(reponse -> {
            if (reponse == ButtonType.OK) {
                eleveService.supprimer(selectionne.getIdEleve());
                labelStatus.setStyle("-fx-text-fill: #27ae60;");
                labelStatus.setText("✅ Élève supprimé.");
                chargerEleves();
            }
        });
    }

    @FXML
    public void annulerForm() {
        afficherFormulaire(false);
        viderFormulaire();
    }

    private void afficherFormulaire(boolean visible) {
        panneauForm.setVisible(visible);
        panneauForm.setManaged(visible);
    }

    private void viderFormulaire() {
        fieldNumero.clear();
        fieldIdClasse.clear();
        fieldDateInscription.clear();
        fieldAnneeScolaire.clear();
        comboActif.setValue(null);
        checkRedoublant.setSelected(false);
    }
}