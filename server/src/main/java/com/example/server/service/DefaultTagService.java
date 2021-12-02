package com.example.server.service;

import com.example.server.data.Tag;
import com.example.server.dto.TagData;
import com.example.server.repository.PostRepository;
import com.example.server.repository.TagRepository;
import com.example.server.repository.UserRepository;
import com.example.server.utils.DataMappingUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("tagService")
public class DefaultTagService implements TagService {
	@Autowired
	private TagRepository tagRepo;
	@Autowired
	private PostRepository postRepo;
	@Autowired
	private UserRepository userRepo;

	@Override
	public TagData saveTag(TagData tagData) {
		Tag tagInstance = DataMappingUtils.populateTagEntity(postRepo, userRepo, tagData);

		return DataMappingUtils.populateTagData((tagRepo.save(tagInstance)));
	}

	@Override
	public TagData getTagById(long tagId) {
		return null;
	}

	@Override
	public boolean deleteTag(Long tagId) {
		return false;
	}
}
