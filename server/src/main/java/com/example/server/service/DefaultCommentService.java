package com.example.server.service;

import com.example.server.data.Comment;
import com.example.server.data.Post;
import com.example.server.data.User;
import com.example.server.dto.CommentData;
import com.example.server.dto.PostData;
import com.example.server.repository.CommentRepository;
import com.example.server.repository.PostRepository;
import com.example.server.repository.UserRepository;
import com.example.server.utils.DataMappingUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

import static com.example.server.utils.DataMappingUtils.populateCommentData;

@Service("commentService")
public class DefaultCommentService implements CommentService {
    @Autowired
    private CommentRepository commentRepo;
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private UserRepository userRepo;

    /**
     * Method to save a comment to database
     * @param commentData
     * @return CommentData
     */
    @Override
    public CommentData saveComment(CommentData commentData) {
        Comment commentInstance = DataMappingUtils.populateCommentEntity(postRepo, userRepo, commentData);

        return populateCommentData((commentRepo.save(commentInstance)));
    }

    /**
     * Method to delete a comment by id from database.
     * @param commentId
     * @return boolean
     */
    @Override
    public boolean deleteComment(Long commentId) {
        commentRepo.deleteById(commentId);
        return true;
    }

    /**
     * Method to get all the comments.
     * @return List<CommentData>
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
     * Method to get a comment by Id.
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
     * Method to get all the comments for a post.
     * @param postId
     * @return List<CommentData>
     */
    @Override
    public List<CommentData> getCommentsByPostId(long postId) {
        List<Comment> comments = commentRepo.findByPostId(postId);
        List<CommentData> commentsResponse = new ArrayList<>();
        comments.forEach(comment -> {
            commentsResponse.add(populateCommentData(comment));
        });

        return commentsResponse;
    }

    /**
     * Method to get all the comments for admin
     * @param Fid
     * @param userId
     * @return List<CommentData>
     */
    @Override
    public List<CommentData> getAllCommentsByIsAdmin(String Fid, long userId){
        List<CommentData> commentData = new ArrayList<>();
        User currentUser = userRepo.getById(userId);
        if(currentUser.getIsAdmin().equals(true) && currentUser.getFid().equals(Fid)){
            List<Comment> commentList = commentRepo.findAll();
            commentList.forEach(comment -> {
                commentData.add(populateCommentData(comment));
            });

        }
        return commentData;
    }
}
