package com.example.server.repository;

import com.example.server.data.Comment;
import com.example.server.data.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface CommentRepository extends JpaRepository<Comment, Long>{

}
