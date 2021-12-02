package com.example.server.repository;

import com.example.server.data.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
	List<Tag> getTagsByUserId(long userId);
	List<Tag> getTagsByPostId(long userId);
}
