package com.example.demo.config;

import com.example.demo.entity.Conference;
import com.example.demo.entity.User;
import com.example.demo.repository.ConferenceRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDate;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final ConferenceRepository conferenceRepository;

    @Override
    public void run(String... args) {
        // Initializing User
        if (userRepository.findByUsername("user").isEmpty()) {
            User user = User.builder()
                .username("user")
                .password("password") // In-memory auth uses this, we store it in DB for linking
                .email("user@example.com")
                .roles(Set.of("USER"))
                .build();
            userRepository.save(user);
        }

        // Initializing Sample Conferences
        if (conferenceRepository.count() == 0) {
            conferenceRepository.save(Conference.builder()
                .name("International Conference on Machine Learning (ICML)")
                .url("https://icml.cc/")
                .submissionDeadline(LocalDate.now().plusMonths(2))
                .notificationDate(LocalDate.now().plusMonths(4))
                .eventDate(LocalDate.now().plusMonths(6))
                .fees("$500")
                .plagiarismPolicy("Strict plagiarism checks. No more than 15% similarity.")
                .aiPolicy("AI-generated text must be clearly labeled and justified.")
                .pageLimit(8)
                .ranking("CORE A*")
                .build());

            conferenceRepository.save(Conference.builder()
                .name("Computer Vision and Pattern Recognition (CVPR)")
                .url("https://cvpr.thecvf.com/")
                .submissionDeadline(LocalDate.now().plusMonths(1))
                .notificationDate(LocalDate.now().plusMonths(3))
                .eventDate(LocalDate.now().plusMonths(5))
                .fees("$600")
                .plagiarismPolicy("Originality is key. Self-plagiarism is also prohibited.")
                .aiPolicy("Prohibited for core creative sections of the paper.")
                .pageLimit(10)
                .ranking("CORE A*")
                .build());
        }
    }
}
