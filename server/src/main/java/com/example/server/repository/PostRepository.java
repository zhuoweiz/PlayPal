package com.example.server.repository;

import com.example.server.data.Post;
import com.example.server.dto.PostData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
	List<Post> findByLatBetweenAndLngBetween(
		double lowerLat, double upperLat,
		double lowerLng, double upperLng
		);

	List<Post> findByTitleContainingOrContentContaining(
		String firstKeyword,
		String secondKeyword
	);
}