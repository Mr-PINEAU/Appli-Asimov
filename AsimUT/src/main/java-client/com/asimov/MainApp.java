package com.asimov;

import com.asimov.api.ApiClient;

import java.net.URI;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static com.asimov.api.ApiClient.BASE_URL;

public class MainApp {

    public static void main(String[] args) {
        System.out.println("Application démarrée !");

        ApiClient api = new ApiClient();

        try {
            String response = api.put("/test", "{\"name\":\"Asim\"}");
            System.out.println(response);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


}

