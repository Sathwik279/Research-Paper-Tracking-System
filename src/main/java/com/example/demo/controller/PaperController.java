package com.example.demo.controller;

import com.example.demo.entity.Paper;
import com.example.demo.entity.User;
import com.example.demo.service.PaperService;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/papers")
@RequiredArgsConstructor
public class PaperController {
    private final PaperService paperService;
    private final UserService userService;

    @GetMapping
    public List<Paper> getMyPapers(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername()).orElseThrow();
        return paperService.getPapersByUser(user);
    }

    @PostMapping
    public Paper createPaper(@RequestBody Paper paper, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername()).orElseThrow();
        paper.setUser(user);
        return paperService.savePaper(paper);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaper(@PathVariable Long id) {
        paperService.deletePaper(id);
        return ResponseEntity.noContent().build();
    }
}
