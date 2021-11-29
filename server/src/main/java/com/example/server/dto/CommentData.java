package com.example.server.dto;

import com.example.server.data.User;

public class CommentData {
    private Long id;
    private Long senderId;
    private String content;
    private UserData sender;
    private Long postId;
    private PostData post;
    public CommentData() {}

    public void setId(Long id) {
        this.id = id;
    }
    public void setSender(UserData sender) { this.sender = sender; }
    public void setPost(PostData post) { this.post = post; }
    public void setSenderId(Long userId){ this.senderId = userId; }
    public void setContent(String content) {
        this.content = content;
    }
    public void setPostId(Long postId) {this.postId = postId;}
    public Long getSenderId() {return sender.getId();}
    public Long getPostId() {return post.getId();}
    public UserData getSender() { return sender; }
    public PostData getPost() { return post; }
    public Long getId() {
        return id;
    }
    public String getContent() {
        return content;
    }

    @Override
    public String toString() {
        return "Post: Id: " + id + "senderId" + senderId + " content: " + content;
    }
}
