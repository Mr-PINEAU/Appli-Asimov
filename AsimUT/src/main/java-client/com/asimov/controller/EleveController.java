package com.asimov.controller;

import com.asimov.model.EleveModel;
import com.asimov.service.EleveService;
import javafx.application.Platform;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.VBox;

import java.util.List;
import java.util.stream.Collectors;

public class EleveController {

    @FXML private TableView<EleveModel> tableEleves;
    @FXML private TableColumn<EleveModel, Integer> colId;
    @FXML private TableColumn<EleveModel, String>  colNumero;
    @FXML private TableColumn<EleveModel, Integer> colIdClasse;
    @FXML private TableColumn<EleveModel, String>  colDateInscription;
    @FXML private TableColumn<EleveModel, String>  colAnneeScolaire;
    @FXML private TableColumn<EleveModel, String>  colStatut;
    @FXML private TableColumn<EleveModel, Integer> colRedoublant;

    @FXML private VBox panneauForm;
    @FXML private Label titreForm;
    @FXML private TextField fieldNumero;
    @FXML private TextField fieldIdClasse;
    @FXML private TextField fieldDateInscription;
    @FXML private TextField fieldAnneeScolaire;
    @FXML private ComboBox<String> comboActif;
    @FXML private CheckBox checkRedoublant;
    @FXML private Label labelStatus;
    @FXML private TextField searchField;

    private final EleveService eleveService = new EleveService();
    private ObservableList<EleveModel> listeEleves = FXCollections.observableArrayList();
    private EleveModel eleveEnCoursModification = null;

    @FXML
    public void initialize() {
        colId.setCellValueFactory(new PropertyValueFactory<>("idEleve"));
        colNumero.setCellValueFactory(new PropertyValueFactory<>("numeroEleve"));
        colIdClasse.setCellValueFactory(new PropertyValueFactory<>("idClasse"));
        colDateInscription.setCellValueFactory(new PropertyValueFactory<>("dateInscription"));
        colAnneeScolaire.setCellValueFactory(new PropertyValueFactory<>("anneeScolaire"));
        colStatut.setCellValueFactory(new PropertyValueFactory<>("actif"));
        colRedoublant.setCellValueFactory(new PropertyValueFactory<>("redoublant"));

        // ✅ 1. Cacher ID et ID Classe
        colId.setVisible(false);
        colIdClasse.setVisible(false);

        // ✅ 2. Redoublant affiche "Oui" ou "Non"
        colRedoublant.setCellFactory(col -> new TableCell<>() {
            @Override
            protected void updateItem(Integer item, boolean empty) {
                super.updateItem(item, empty);
                if (empty || item == null) {
                    setText(null);
                } else {
                    setText(item == 1 ? "✅ Oui" : "Non");
                }
            }
        });

        comboActif.setItems(FXCollections.observableArrayList(
                "Inscrit", "En attente", "Radié", "Transféré"
        ));

        chargerEleves();
    }

    @FXML
    public void chargerEleves() {
        new Thread(() -> {
            try {
                List<EleveModel> eleves = eleveService.getAll();
                Platform.runLater(() -> {
                    listeEleves = FXCollections.observableArrayList(eleves);
                    tableEleves.setItems(listeEleves);
                    labelStatus.setStyle("-fx-text-fill: #27ae60;");
                    labelStatus.setText("✅ " + eleves.size() + " élève(s) chargé(s)");
                });
            } catch (Exception e) {
                e.printStackTrace();
                Platform.runLater(() -> {
                    labelStatus.setStyle("-fx-text-fill: #e74c3c;");
                    labelStatus.setText("❌ Erreur chargement : " + e.getMessage());
                });
            }
        }).start();
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
        String dateClean = selectionne.getDateInscription() != null ? selectionne.getDateInscription().split("T")[0] : "";
        fieldDateInscription.setText(dateClean);
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

        String numero  = fieldNumero.getText();
        int idClasse = fieldIdClasse.getText().isEmpty() ? 1 : Integer.parseInt(fieldIdClasse.getText());
        String date = fieldDateInscription.getText().split("T")[0]; // ✅ garde seulement "2024-09-01"
        String annee   = fieldAnneeScolaire.getText();
        String actif   = comboActif.getValue() != null ? comboActif.getValue() : "Inscrit";
        int redoublant = checkRedoublant.isSelected() ? 1 : 0;

        new Thread(() -> {
            try {
                if (eleveEnCoursModification == null) {
                    EleveModel nouvelEleve = new EleveModel(
                            1, idClasse, numero, date, actif, annee, redoublant
                    );
                    eleveService.ajouter(nouvelEleve);
                } else {
                    eleveEnCoursModification.setNumeroEleve(numero);
                    eleveEnCoursModification.setIdClasse(idClasse);
                    eleveEnCoursModification.setDateInscription(date);
                    eleveEnCoursModification.setAnneeScolaire(annee);
                    eleveEnCoursModification.setActif(actif);
                    eleveEnCoursModification.setRedoublant(redoublant);
                    eleveService.modifier(eleveEnCoursModification);
                }
                Platform.runLater(() -> {
                    afficherFormulaire(false);
                    viderFormulaire();
                    chargerEleves();
                    labelStatus.setStyle("-fx-text-fill: #27ae60;");
                    labelStatus.setText("✅ Opération réussie !");
                });
            } catch (Exception e) {
                e.printStackTrace();
                Platform.runLater(() -> {
                    labelStatus.setStyle("-fx-text-fill: #e74c3c;");
                    labelStatus.setText("❌ Erreur : " + e.getMessage());
                });
            }
        }).start();
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
                new Thread(() -> {
                    try {
                        eleveService.supprimer(selectionne.getIdEleve());
                        Platform.runLater(() -> {
                            chargerEleves();
                            labelStatus.setStyle("-fx-text-fill: #27ae60;");
                            labelStatus.setText("✅ Élève supprimé.");
                        });
                    } catch (Exception e) {
                        e.printStackTrace();
                        Platform.runLater(() -> {
                            labelStatus.setStyle("-fx-text-fill: #e74c3c;");
                            labelStatus.setText("❌ Erreur suppression : " + e.getMessage());
                        });
                    }
                }).start();
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