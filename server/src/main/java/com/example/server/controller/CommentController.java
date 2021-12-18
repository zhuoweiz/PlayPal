package com.example.server.controller;

import com.example.server.dto.CommentData;
import com.example.server.service.CommentService;
import com.example.server.utils.MyExceptionHandler;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://143.198.190.9"})
@RestController
@RequestMapping("/comments")
public class CommentController {

    @Resource(name = "commentService")
    private CommentService commentService;

    /**
     * Method to get the comment based on id.
     * @param id
     * @return CommentData
     */
    @GetMapping("/comment/{id}")
    public CommentData getComment(@PathVariable Long id) {
        System.out.println(" === GET Comment BY ID ===");
        return commentService.getCommentById(id);
    }

    /**
     * Method to get all the Comments for a post.
     * @param postId
     * @return List<CommentData>
     */
    @GetMapping("/{postId}")
    public List<CommentData> getCommentsByPostId(@PathVariable Long postId) {
        System.out.println(" === GET Comments BY POST ID ===");
        return commentService.getCommentsByPostId(postId);
    }

    /**
     * Method to post a comment
     * @param headers
     * @param commentData
     * @return CommentData
     */
    @PostMapping("/comment")
    public CommentData saveComment(@RequestHeader HttpHeaders headers,
            final @RequestBody CommentData commentData)
    {
        MyExceptionHandler.TokenValidationHandler(headers);
        System.out.println("Comment new comment === " + commentData.toString());
        return commentService.saveComment(commentData);
    }

    /**
     * Method to delete a comment based on id.
     * @param headers
     * @param id
     * @return boolean
     */
    @DeleteMapping("/comment/{id}")
    public Boolean deleteComment(@RequestHeader HttpHeaders headers, @PathVariable Long id) {
        MyExceptionHandler.TokenValidationHandler(headers);
        return commentService.deleteComment(id);
    }
  
    /**
     * Method to get all the comments.
     * @return List<CommentData>
     */
    @GetMapping("/getAllComments/{userId}")
    public List<CommentData> getAllCommentsByIsAdmin(@RequestHeader HttpHeaders headers, @PathVariable Long userId){
        String Fid = MyExceptionHandler.TokenValidationWithFid(headers);
        return commentService.getAllCommentsByIsAdmin(Fid, userId);
    }
}

