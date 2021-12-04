package com.example.server.service;

import com.example.server.dto.TagData;

import java.util.List;

public interface TagService {
	TagData saveTag(TagData tag);
	boolean deleteTag(final Long tagId);
	TagData getTagById(final long tagId);
	List<TagData> searchTagByLabel(final String label);
}
