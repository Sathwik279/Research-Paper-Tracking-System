package com.example.demo.service;

import com.example.demo.entity.Submission;
import com.example.demo.entity.User;
import com.example.demo.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubmissionService {
    private final SubmissionRepository submissionRepository;

    public List<Submission> getSubmissionsByUser(User user) {
        return submissionRepository.findByUser(user);
    }

    @Transactional
    public Submission saveSubmission(Submission submission) {
        return submissionRepository.save(submission);
    }

    @Transactional
    public void deleteSubmission(Long id) {
        submissionRepository.deleteById(id);
    }
}
