package com.example.server.utils;

import com.example.server.data.Comment;
import com.example.server.data.Post;
import com.example.server.data.User;
import com.example.server.dto.CommentData;
import com.example.server.repository.PostRepository;
import com.example.server.repository.UserRepository;

import javax.persistence.EntityNotFoundException;

public class DataMappingUtils {

	public static CommentData populateCommentData(final Comment comment){
		CommentData commentData = new CommentData();
		commentData.setId(comment.getId());
		commentData.setContent(comment.getContent());
		commentData.setPostId(comment.getPost().getId());
		commentData.setCreatorId(comment.getCreator().getId());
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
}
