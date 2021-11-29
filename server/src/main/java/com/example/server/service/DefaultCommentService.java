package com.example.server.service;

import com.example.server.data.Comment;
import com.example.server.data.Post;
import com.example.server.data.User;
import com.example.server.dto.CommentData;
import com.example.server.dto.PostData;
import com.example.server.dto.UserData;
import com.example.server.repository.CommentRepository;
import com.example.server.repository.PostRepository;
import com.example.server.repository.UserRepository;
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

    /**
     * Create a user based on the data sent to the service class.
     * @param commentData
     * @return DTO representation of the user
     */
    @Override
    public CommentData saveComment(CommentData commentData) {
        final long postId = commentData.getPostId();
        Comment commentInstance = populateCommentEntity(commentData);
        Post post = postRepo.findById(postId).orElseThrow(
          () -> new EntityNotFoundException());
        commentInstance.setPost(post);
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

    @Override
    public List<CommentData> getCommentsByPostId(long postId) {
        List<CommentData> commentData = new ArrayList<>();
        List<Comment> commentList = commentRepo.findAll();
        List<Comment> commentList_PostId = new ArrayList<>();
        commentList.forEach(comment -> {
            if (comment.getPostId() == postId){
                commentList_PostId.add(comment);
            }
        });
        commentList_PostId.forEach(comment->{
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

//    @Override
//    public List<CommentData> getCommentsByPostId(long postId) {
//        List<Comment> comments = commentRepo.findByPostId(postId);
//
//        List<CommentData> commentsResponse = new ArrayList<>();
//        comments.forEach(comment -> {
//            commentsResponse.add(populateCommentData(comment));
//        });
//
//        return commentsResponse;
//    }

    /**
     * Internal method to convert User JPA entity to the DTO object
     * for frontend data
     * @param comment
     * @return UserData
     */
    private CommentData populateCommentData(final Comment comment){
        CommentData commentData = new CommentData();
        commentData.setId(comment.getId());
        commentData.setPostId(comment.getPostId());
        commentData.setSenderId(comment.getCreatorId());
        User sender = userRepo.getById(comment.getCreatorId());
        Post post = postRepo.getById((comment.getPostId()));
        commentData.setSender(populateUserData(sender));
        commentData.setPost(populatePostData(post));
        commentData.setContent(comment.getContent());
        commentData.setPostId(comment.getPost().getId());

        return commentData;
    }

    private UserData populateUserData(final User user){
        UserData userData = new UserData();
        userData.setId(user.getId());
        userData.setName(user.getName());
        userData.setEmail(user.getEmail());

        return userData;
    }

    private PostData populatePostData(final Post post){
        PostData postData = new PostData();
        postData.setId(post.getId());
        postData.setCreatorId(post.getCreatorId());

        User user = userRepo.getById(post.getCreatorId());
        postData.setCreator(populateUserData(user));

        postData.setTitle(post.getTitle());
        postData.setContent(post.getContent());

        return postData;
    }

    /**
     * Method to map the frontend user object to the JPA customer entity.
     * @param commentData
     * @return Post
     */
    private Comment populateCommentEntity(CommentData commentData){
        Comment comment = new Comment();
        comment.setContent(commentData.getContent());
        User sender = userRepo.getById(commentData.getSenderId());
        comment.setCreator(sender);
        Post post = postRepo.getById(commentData.getPostId());
        comment.setPost(post);
        return comment;
    }

}
