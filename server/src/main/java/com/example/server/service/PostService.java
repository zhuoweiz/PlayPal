package com.example.server.service;

import com.example.server.dto.PostData;

import java.util.ArrayList;
import java.util.List;

public interface PostService {
    PostData savePost(PostData post);
    boolean deletePost(final Long postId);
    List<PostData> getAllPosts();
    PostData getPostById(final long postId);
    List<PostData> searchPosts(final String searchKeyword);
}
