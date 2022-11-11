package com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Medihost API", version = "1.0", description = "Online health consulation application"))
public class MedihostWithForgetPasswordApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedihostWithForgetPasswordApplication.class, args);
	}

}
