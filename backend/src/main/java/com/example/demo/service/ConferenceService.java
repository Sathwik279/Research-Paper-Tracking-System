package com.example.demo.service;

import com.example.demo.entity.Conference;
import com.example.demo.repository.ConferenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConferenceService {
    private final ConferenceRepository conferenceRepository;

    public List<Conference> getAllConferences() {
        return conferenceRepository.findAll();
    }

    public Optional<Conference> getConferenceById(Long id) {
        return conferenceRepository.findById(id);
    }

    @Transactional
    public Conference saveConference(Conference conference) {
        return conferenceRepository.save(conference);
    }

    @Transactional
    public void deleteConference(Long id) {
        conferenceRepository.deleteById(id);
    }
}
