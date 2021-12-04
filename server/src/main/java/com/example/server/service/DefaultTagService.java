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
		Tag tag = tagRepo.getById(tagId);
		TagData tagData = new TagData();

		// populate tagData
		tagData.setPostId(tag.getPost().getId());
		tagData.setUserId(tag.getUser().getId());
		tagData.setLabel(tag.getLabel());
		tagData.setId(tag.getId());

		return tagData;
	}

	@Override
	public boolean deleteTag(Long tagId) {
		return false;
	}
}
