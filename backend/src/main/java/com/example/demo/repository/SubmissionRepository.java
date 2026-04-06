package com.example.demo.repository;

import com.example.demo.entity.Submission;
import com.example.demo.entity.User;
import com.example.demo.entity.Conference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUser(User user);
    List<Submission> findByConference(Conference conference);
}
