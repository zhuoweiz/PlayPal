package com.example.server.repository;

import com.example.server.data.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
	List<Tag> findByUserId(long userId);

	@Transactional
	void deleteByUserId(long userId);

	List<Tag> findByLabelContainingAndPostIdIsNotNull(String label);
}
