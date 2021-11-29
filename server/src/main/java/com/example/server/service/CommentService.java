package com.example.server.service;

import com.example.server.dto.CommentData;

import java.util.ArrayList;
import java.util.List;

public interface CommentService {
    CommentData saveComment(CommentData comment);
    boolean deleteComment(final Long commentId);
    List<CommentData> getAllComments();
    CommentData getCommentById(final long commentId);

    List<CommentData> getCommentsByPostId(final long postId);
}
