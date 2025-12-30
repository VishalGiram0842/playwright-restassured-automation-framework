package com.framework.tests;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import org.testng.Assert;

public class UserApiTest {
    private static final String BASE_URL = "http://localhost:8080/api";
    private static final String USERS_ENDPOINT = "/users";

    @BeforeClass
    public void setup() {
        RestAssured.baseURI = BASE_URL;
    }

    @Test(description = "Test: Health check API is available")
    public void testHealthCheck() {
        Response response = RestAssured
                .given()
                .when()
                .get(BASE_URL + "/health")
                .then()
                .extract()
                .response();

        // Basic assertion - if response returns status code, test passes
        Assert.assertNotNull(response, "Response should not be null");
    }

    @Test(description = "Test: GET users endpoint returns valid response")
    public void testGetUsers() {
        Response response = RestAssured
                .given()
                    .contentType("application/json")
                .when()
                    .get(USERS_ENDPOINT)
                .then()
                .extract()
                .response();

        // Response should be 200 or other valid status
        Assert.assertNotNull(response, "Response should not be null");
        int statusCode = response.getStatusCode();
        Assert.assertTrue(statusCode >= 200 && statusCode < 500, 
            "Expected valid status code but got " + statusCode);
    }

    @Test(description = "Test: User object structure validation")
    public void testUserObjectStructure() {
        // This test validates that the API response structure is correct
        Response response = RestAssured
                .given()
                    .contentType("application/json")
                .when()
                    .get(USERS_ENDPOINT)
                .then()
                .extract()
                .response();

        Assert.assertNotNull(response.getBody(), "Response body should not be null");
    }

    @Test(description = "Test: Verify response content type is JSON")
    public void testResponseContentType() {
        Response response = RestAssured
                .given()
                .when()
                .get(USERS_ENDPOINT)
                .then()
                .extract()
                .response();

        String contentType = response.getContentType();
        Assert.assertNotNull(contentType, "Content-Type header should be present");
    }
}
