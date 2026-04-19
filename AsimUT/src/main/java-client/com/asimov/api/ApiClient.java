package com.asimov.api;

public String put(String endpoint, String json) throws Exception {
    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + endpoint))
            .header("Content-Type", "application/json")
            .PUT(HttpRequest.BodyPublishers.ofString(json))
            .build();

    return client.send(request, HttpResponse.BodyHandlers.ofString()).body();
}
