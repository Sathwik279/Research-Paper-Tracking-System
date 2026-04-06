package com.example.demo.repository;

import com.example.demo.entity.Paper;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PaperRepository extends JpaRepository<Paper, Long> {
    List<Paper> findByUser(User user);
}
