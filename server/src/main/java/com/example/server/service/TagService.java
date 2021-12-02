package com.example.server.service;

import com.example.server.dto.TagData;

public interface TagService {
	TagData saveTag(TagData tag);
	boolean deleteTag(final Long tagId);
	TagData getTagById(final long tagId);
}
