package com.example.server.utils;

import com.example.server.data.Comment;
import com.example.server.data.Post;
import com.example.server.data.Tag;
import com.example.server.data.User;
import com.example.server.dto.CommentData;
import com.example.server.dto.TagData;
import com.example.server.repository.PostRepository;
import com.example.server.repository.TagRepository;
import com.example.server.repository.UserRepository;

import javax.persistence.EntityNotFoundException;

public class DataMappingUtils {

	public static CommentData populateCommentData(final Comment comment){
		CommentData commentData = new CommentData();
		commentData.setId(comment.getId());
		commentData.setContent(comment.getContent());
		commentData.setPostId(comment.getPost().getId());
		commentData.setCreatorId(comment.getCreator().getId());
		commentData.setCreatedDate(comment.getCreatedDate());

		// use creatorId and set creatorName
		commentData.setCreatorName(comment.getCreator().getName());

		return commentData;
	}

	public static Comment populateCommentEntity(PostRepository postRepo, UserRepository userRepo, CommentData commentData){
		Comment comment = new Comment();
		comment.setId(commentData.getId());
		comment.setContent(commentData.getContent());
		Post post = postRepo.findById(commentData.getPostId()).orElseThrow(
			() -> new EntityNotFoundException());
		User creator = userRepo.findById(commentData.getCreatorId()).orElseThrow(
			() -> new EntityNotFoundException());
		comment.setPost(post);
		comment.setCreator(creator);
		return comment;
	}

	public static TagData populateTagData(final Tag tag) {
		TagData tagData = new TagData();
		tagData.setId(tag.getId());
		tagData.setLabel(tag.getLabel());
//		tagData.setUserId(tag.getUser().getId());
//		tagData.setPostId(tag.getPost().getId());

		return tagData;
	}

	public static Tag populateTagEntity(PostRepository postRepo, UserRepository userRepo, TagData tagData) {
		Tag tag = new Tag();
		// no need to setId, used on save, auto generated
		tag.setLabel(tagData.getLabel());
		Post post = postRepo.findById(tagData.getPostId()).orElseThrow(
			() -> new EntityNotFoundException());
		User user = userRepo.findById(tagData.getUserId()).orElseThrow(
			() -> new EntityNotFoundException());
		tag.setPost(post);
		tag.setUser(user);

		return tag;
	}

}
