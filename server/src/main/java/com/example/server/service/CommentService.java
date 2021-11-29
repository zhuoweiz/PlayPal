package com.example.server.service;

import com.example.server.dto.CommentData;

import java.util.ArrayList;
import java.util.List;

public interface CommentService {
    CommentData saveComment(CommentData comment);
    boolean deleteComment(final Long commentId);
    List<CommentData> getAllComments();
    List<CommentData> getCommentsByPostId(final long postId);
    CommentData getCommentById(final long commentId);
}
