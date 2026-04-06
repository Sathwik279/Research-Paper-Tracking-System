package com.example.demo.controller;

import com.example.demo.entity.Conference;
import com.example.demo.service.ConferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conferences")
@RequiredArgsConstructor
public class ConferenceController {
    private final ConferenceService conferenceService;

    @GetMapping
    public List<Conference> getAllConferences() {
        return conferenceService.getAllConferences();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Conference> getConferenceById(@PathVariable Long id) {
        return conferenceService.getConferenceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Conference createConference(@RequestBody Conference conference) {
        return conferenceService.saveConference(conference);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Conference> updateConference(@PathVariable Long id, @RequestBody Conference conference) {
        return conferenceService.getConferenceById(id)
                .map(existing -> {
                    conference.setId(id);
                    return ResponseEntity.ok(conferenceService.saveConference(conference));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConference(@PathVariable Long id) {
        conferenceService.deleteConference(id);
        return ResponseEntity.noContent().build();
    }
}
