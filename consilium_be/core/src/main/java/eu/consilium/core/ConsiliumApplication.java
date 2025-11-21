package eu.consilium.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ConsiliumApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConsiliumApplication.class, args);
	}

}
