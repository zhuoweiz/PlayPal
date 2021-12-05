package com.example.server.repository;

import com.example.server.data.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

	List<Message> findByContent(String content);
	List<Message> findByPost_Id(long postId);
//	List<Message> findByPostId(long postId);
}
