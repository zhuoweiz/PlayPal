package com.example.server.service;

import com.example.server.dto.CommentData;
import com.example.server.dto.PostData;
import com.example.server.dto.UserData;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public interface PostService {
    PostData savePost(PostData post);
    boolean deletePost(final Long postId);
    List<PostData> getAllPosts();
    PostData getPostById(final long postId);
    UserData getPostCreator(final long postId);
    List<PostData> searchPosts(final String searchKeyword) throws ParseException;
    List<UserData> getJoinedUsers(final long postId);

    PostData getFullPostById(final long postId);
    List<PostData> searchPostByTag(final String searchString);
    List<PostData> searchPostByLatLng(final double lat, final double lng);
    List<PostData> searchPostByUserInterest(long userId);
    boolean archivePost(long postId);
    boolean unarchivePost(long postId);
}
