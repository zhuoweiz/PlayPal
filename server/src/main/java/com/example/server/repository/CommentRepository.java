package com.example.server.repository;

import com.example.server.data.Comment;
import com.example.server.data.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long>{
	List<Comment> findByPostId(long postId);
	List<Comment> findByCreatorId(long creatorId);
}
