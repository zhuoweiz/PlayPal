package com.example.server;

import com.example.server.data.SpringSecurityAuditorAware;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@SpringBootApplication
@RestController
@EnableJpaAuditing(auditorAwareRef="auditorAware")
public class ServerApplication {

    private static final Logger log = LoggerFactory.getLogger(ServerApplication.class);

    @Bean
    public AuditorAware<String> auditorAware() {
        return new SpringSecurityAuditorAware();
    }

    public static void main(String[] args) throws IOException {

        // Firebase admin sdk setup
        FileInputStream serviceAccount =
                new FileInputStream(ServerApplication.class
                        .getClassLoader()
                        .getResource("serviceAccount.json")
                        .getFile()
                );
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();
        FirebaseApp.initializeApp(options);



        SpringApplication.run(ServerApplication.class, args);
    }

    @GetMapping("/hello")
    public String sayHello(@RequestParam(value = "myName", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }
}
