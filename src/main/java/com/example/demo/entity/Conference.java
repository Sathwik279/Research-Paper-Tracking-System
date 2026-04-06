package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "conferences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Conference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String url;

    private LocalDate submissionDeadline;
    private LocalDate notificationDate;
    private LocalDate eventDate;

    private String fees;

    @Column(length = 2000)
    private String plagiarismPolicy;

    @Column(length = 2000)
    private String aiPolicy;

    private Integer pageLimit;

    private String ranking; // e.g., CORE A*, Q1
}
