package com.example.demo.service;

import com.example.demo.entity.Paper;
import com.example.demo.entity.User;
import com.example.demo.repository.PaperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaperService {
    private final PaperRepository paperRepository;

    public List<Paper> getPapersByUser(User user) {
        return paperRepository.findByUser(user);
    }

    @Transactional
    public Paper savePaper(Paper paper) {
        return paperRepository.save(paper);
    }

    @Transactional
    public void deletePaper(Long id) {
        paperRepository.deleteById(id);
    }
}
