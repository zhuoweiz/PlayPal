package com.example.server.service;

import com.example.server.data.Tag;
import com.example.server.dto.TagData;
import com.example.server.repository.PostRepository;
import com.example.server.repository.TagRepository;
import com.example.server.repository.UserRepository;
import com.example.server.utils.DataMappingUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("tagService")
public class DefaultTagService implements TagService {
	@Autowired
	private TagRepository tagRepo;
	@Autowired
	private PostRepository postRepo;
	@Autowired
	private UserRepository userRepo;

	/**
	 * Method to add a tag to the system.
	 * @param tagData
	 * @return TagData
	 */
	@Override
	public TagData saveTag(TagData tagData) {
		Tag tagInstance = DataMappingUtils.populateTagEntity(postRepo, userRepo, tagData);

		return DataMappingUtils.populateTagData((tagRepo.save(tagInstance)));
	}

	/**
	 * Method to get a tag based on id.
	 * @param tagId
	 * @return TagData
	 */
	@Override
	public TagData getTagById(long tagId) {
		Tag tag = tagRepo.getById(tagId);
		TagData tagData = new TagData();
		tagData.setPostId(tag.getPost().getId());
		tagData.setUserId(tag.getUser().getId());
		tagData.setLabel(tag.getLabel());
		tagData.setId(tag.getId());

		return tagData;
	}

	/**
	 * Method to search for tags based on a label
	 * @param label
	 * @return List<TagData>
	 */
	@Override
	public List<TagData> searchTagByLabel(String label) {
		List<TagData> responseList = new ArrayList<>();
		List<Tag> searchResult = tagRepo.findByLabelContainingAndPostIdIsNotNull(label);
		searchResult.forEach(tag -> {
			TagData tmpTagData = DataMappingUtils.populateTagData(tag);
			responseList.add(tmpTagData);
		});
		return responseList;
	}

	/**
	 * Method to delete a tag based on tag id.
	 * @param tagId
	 * @return boolean
	 */
	@Override
	public boolean deleteTag(Long tagId) {
		return false;
	}
}
