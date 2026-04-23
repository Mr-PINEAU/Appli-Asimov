package com.asimov;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class Main extends Application {

    @Override
    public void start(Stage stage) throws Exception {

        // Charger la fenêtre de connexion
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/views/Login.fxml"));

        Scene scene = new Scene(loader.load(), 600, 400);

        // Titre de la fenêtre
        stage.setTitle("Application Asimov - Collège");

        // Empêcher le redimensionnement
        stage.setResizable(false);

        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }

}
