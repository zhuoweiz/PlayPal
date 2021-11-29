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

    @GetMapping
    public List<CommentData> getComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/bypost/{id}")
    public List<CommentData> getCommentsByPostId(@PathVariable Long id) {
        System.out.println("== GET Comment BY PostID ==");
        return commentService.getCommentsByPostId(id);
    }
    @GetMapping("/comment/{id}")
    public CommentData getComment(@PathVariable Long id) {
        System.out.println(" === GET Comment BY ID ===");
        return commentService.getCommentById(id);
    }

    @GetMapping("/{postId}")
    public List<CommentData> getCommentsByPostId(@PathVariable Long postId) {
        System.out.println(" === GET Comments BY POST ID ===");
        return commentService.getCommentsByPostId(postId);
    }

    @PostMapping("/comment")
    public CommentData saveComment(final @RequestBody CommentData commentData) {

        System.out.println("Comment new comment === " + commentData.toString());
        return commentService.saveComment(commentData);
    }

    @DeleteMapping("/comment/{id}")
    public Boolean deleteComment(@PathVariable Long id) {
        return commentService.deleteComment(id);
    }
}

