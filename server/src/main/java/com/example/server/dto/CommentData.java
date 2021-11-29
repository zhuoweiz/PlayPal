package com.example.server.dto;

public class CommentData {
    private Long id;
    private Long postId;
    private String content;
    public CommentData() {}

    public void setId(Long id) {
        this.id = id;
    }
    public void setPostId(Long creatorId){ this.postId = creatorId; }
    public void setContent(String content) {
        this.content = content;
    }
    public Long getId() {
        return id;
    }
    public Long getPostId() {
        return postId;
    }
    public String getContent() {
        return content;
    }

    @Override
    public String toString() {
        return "Post: Id: " + id + "userId" + postId + " content: " + content;
    }
}
