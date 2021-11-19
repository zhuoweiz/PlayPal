package com.example.server.dto;

public class CommentData {
    private Long id;
    private Long userId;
    private String content;
    public CommentData() {}

    public void setId(Long id) {
        this.id = id;
    }
    public void setUserId(Long userId){ this.userId = userId; }
    public void setContent(String content) {
        this.content = content;
    }
    public Long getId() {
        return id;
    }
    public Long getUserId() {
        return userId;
    }
    public String getContent() {
        return content;
    }

    @Override
    public String toString() {
        return "Post: Id: " + id + "userId" + userId + " content: " + content;
    }
}
