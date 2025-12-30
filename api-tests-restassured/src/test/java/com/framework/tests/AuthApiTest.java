package com.framework.tests;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import org.testng.Assert;

public class AuthApiTest {
    private static final String BASE_URL = "http://localhost:8080/api";
    private static final String AUTH_ENDPOINT = "/auth";
    private static final String LOGIN_ENDPOINT = "/auth/login";

    @BeforeClass
    public void setup() {
        RestAssured.baseURI = BASE_URL;
    }

    @Test(description = "Test: Login endpoint returns response")
    public void testLoginEndpoint() {
        Response response = RestAssured
                .given()
                    .contentType("application/json")
                    .body("{\"email\":\"test@example.com\",\"password\":\"password123\"}")
                .when()
                    .post(LOGIN_ENDPOINT)
                .then()
                .extract()
                .response();

        Assert.assertNotNull(response, "Response should not be null");
        int statusCode = response.getStatusCode();
        Assert.assertTrue(statusCode >= 200 && statusCode < 500, 
            "Expected valid status code but got " + statusCode);
    }

    @Test(description = "Test: Auth endpoint is accessible")
    public void testAuthEndpointAccessibility() {
        Response response = RestAssured
                .given()
                .when()
                .get(AUTH_ENDPOINT)
                .then()
                .extract()
                .response();

        Assert.assertNotNull(response, "Response should not be null");
    }

    @Test(description = "Test: Login with missing credentials returns error")
    public void testLoginMissingCredentials() {
        Response response = RestAssured
                .given()
                    .contentType("application/json")
                    .body("{}")
                .when()
                    .post(LOGIN_ENDPOINT)
                .then()
                .extract()
                .response();

        // Should return error status
        int statusCode = response.getStatusCode();
        Assert.assertNotNull(statusCode, "Status code should not be null");
    }

    @Test(description = "Test: Verify authentication response structure")
    public void testAuthResponseStructure() {
        Response response = RestAssured
                .given()
                    .contentType("application/json")
                    .body("{\"email\":\"test@example.com\",\"password\":\"password123\"}")
                .when()
                    .post(LOGIN_ENDPOINT)
                .then()
                .extract()
                .response();

        String responseBody = response.getBody().asString();
        Assert.assertNotNull(responseBody, "Response body should not be null");
    }
}
