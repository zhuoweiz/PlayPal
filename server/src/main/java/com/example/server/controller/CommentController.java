package com.example.server.controller;

import com.example.server.dto.CommentData;
import com.example.server.service.CommentService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/comments")
public class CommentController {

    @Resource(name = "commentService")
    private CommentService commentService;

    /**
     * <p>Get all user data in the system.For production system you many want to use
     * pagination.</p>
     * @return List<UserData>
     */
    @GetMapping
    public List<CommentData> getComments() {
        return commentService.getAllComments();
    }

    /**
     * Method to get the user data based on the ID.
     * @param id
     * @return UserData
     */
    @GetMapping("/comment/{id}")
    public CommentData getComment(@PathVariable Long id) {
        System.out.println(" === GET Comment BY ID ===");
        return commentService.getCommentById(id);
    }

    @GetMapping("/{postId}")
    public List<CommentData> getCommentsByPostId(@PathVariable Long postId) {
        System.out.println(" === GET Comment BY POST ID ===");
        return commentService.getCommentsByPostId(postId);
    }

    /**
     * Post request to create user information int the system.
     * @param commentData
     * @return
     */
    @PostMapping("/comment")

    public CommentData saveComment(final @RequestBody CommentData commentData) {

        System.out.println("Comment new comment === " + commentData.toString());
        return commentService.saveComment(commentData);
    }

    /**
     * <p>Delete user from the system based on the ID. The method mapping is like the getUser with difference of
     * @DeleteMapping and @GetMapping</p>
     * @param id
     * @return
     */
    @DeleteMapping("/comment/{id}")
    public Boolean deleteComment(@PathVariable Long id) {
        return commentService.deleteComment(id);
    }
}

