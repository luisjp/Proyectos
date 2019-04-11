package com.napptilus.run;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;

import com.napptilus.services.AppController;


@SpringBootApplication
@ComponentScan(basePackageClasses = AppController.class)
public class App {
	public static void main(final String[] args) {
		final ConfigurableApplicationContext configurableApplicationContext = SpringApplication
				.run(App.class, args);
		 
		 
	}
}