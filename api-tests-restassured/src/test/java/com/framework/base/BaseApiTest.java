package com.framework.base;

import io.rest-assured.RestAssured;
import org.testng.annotations.BeforeClass;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BaseApiTest {
    protected static final Logger logger = LoggerFactory.getLogger(BaseApiTest.class);
    protected static final String API_BASE_URL = System.getenv("API_BASE_URL") != null
            ? System.getenv("API_BASE_URL")
            : "http://localhost:8080/api";

    @BeforeClass
    public void setUp() {
        RestAssured.baseURI = API_BASE_URL;
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
        logger.info("BaseApiTest setup completed. Base URI: " + API_BASE_URL);
    }
}
