package com.example.server.service;

import com.example.server.data.Comment;
import com.example.server.data.Post;
import com.example.server.dto.CommentData;
import com.example.server.repository.CommentRepository;
import com.example.server.repository.PostRepository;
import com.example.server.repository.UserRepository;
import com.example.server.utils.DataMappingUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service("commentService")
public class DefaultCommentService implements CommentService {
    @Autowired
    private CommentRepository commentRepo;
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private UserRepository userRepo;

    @Override
    public CommentData saveComment(CommentData commentData) {
        Comment commentInstance = DataMappingUtils.populateCommentEntity(postRepo, userRepo, commentData);

        return DataMappingUtils.populateCommentData((commentRepo.save(commentInstance)));
    }

    @Override
    public boolean deleteComment(Long commentId) {
        commentRepo.deleteById(commentId);
        return true;
    }

    @Override
    public List<CommentData> getAllComments() {
        List<CommentData> commentData = new ArrayList<>();
        List<Comment> commentList = commentRepo.findAll();
        commentList.forEach(comment -> {
            commentData.add(DataMappingUtils.populateCommentData(comment));
        });
        return commentData;
    }

    @Override
    public CommentData getCommentById(long commentId) {
        return DataMappingUtils.populateCommentData(commentRepo.findById(commentId).orElseThrow(() ->
          new EntityNotFoundException("Comment not found!")
        ));
    }

    @Override
    public List<CommentData> getCommentsByPostId(long postId) {
        List<Comment> comments = commentRepo.findByPostId(postId);
        List<CommentData> commentsResponse = new ArrayList<>();
        comments.forEach(comment -> {
            commentsResponse.add(DataMappingUtils.populateCommentData(comment));
        });

        return commentsResponse;
    }
}
