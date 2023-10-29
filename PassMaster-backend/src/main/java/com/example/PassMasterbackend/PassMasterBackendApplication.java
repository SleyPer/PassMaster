package com.example.PassMasterbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class PassMasterBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PassMasterBackendApplication.class, args);
	}
}
