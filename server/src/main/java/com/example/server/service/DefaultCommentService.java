package com.example.server.service;

import com.example.server.data.Comment;
import com.example.server.dto.CommentData;
import com.example.server.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service("commentService")
public class DefaultCommentService implements CommentService {
    @Autowired
    private CommentRepository commentRepo;

    /**
     * Create a user based on the data sent to the service class.
     * @param commentData
     * @return DTO representation of the user
     */
    @Override
    public CommentData saveComment(CommentData commentData) {
        Comment commentInstance = populateCommentEntity(commentData);
        return populateCommentData((commentRepo.save(commentInstance)));
    }

    /**
     * Delete pet based on the user ID.We can also use other option to delete user
     * based on the entity (passing JPA entity class as method parameter)
     * @param commentId
     * @return boolean flag showing the request status
     */
    @Override
    public boolean deleteComment(Long commentId) {
        commentRepo.deleteById(commentId);
        return true;
    }

    /**
     * Method to return the list of all the users in the system. This is a simple
     * implementation but use pagination in the real world example.
     * @return list of user
     */
    @Override
    public List<CommentData> getAllComments() {
        List<CommentData> commentData = new ArrayList<>();
        List<Comment> commentList = commentRepo.findAll();
        commentList.forEach(comment -> {
            commentData.add(populateCommentData(comment));
        });
        return commentData;
    }

    /**
     * Get user by ID. The service will send the user data else will throw the exception.
     * @param commentId
     * @return CommentData
     */
    @Override
    public CommentData getCommentById(long commentId) {
        return populateCommentData(commentRepo.findById(commentId).orElseThrow(() ->
                new EntityNotFoundException("Comment not found!")
        ));
    }

    /**
     * Internal method to convert User JPA entity to the DTO object
     * for frontend data
     * @param comment
     * @return UserData
     */
    private CommentData populateCommentData(final Comment comment){
        CommentData commentData = new CommentData();
        commentData.setId(comment.getId());
        commentData.setUserId(comment.getUserId());
        commentData.setContent(comment.getContent());

        return commentData;
    }

    /**
     * Method to map the frontend user object to the JPA customer entity.
     * @param commentData
     * @return Post
     */
    private Comment populateCommentEntity(CommentData commentData){
        Comment comment = new Comment();
        comment.setUserId(commentData.getUserId());
        comment.setContent(commentData.getContent());
        return comment;
    }
}
