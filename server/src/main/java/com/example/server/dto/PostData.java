package com.example.server.dto;

public class PostData {
    private Long id;
    private Long userId;
    private String title;
    private String content;
    public PostData() {}

    public void setId(Long id) {
        this.id = id;
    }
    public void setUserId(Long userId){ this.userId = userId; }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public Long getId() {
        return id;
    }
    public Long getUserId() {
        return userId;
    }
    public String getTitle() {
        return title;
    }
    public String getContent() {
        return content;
    }

    @Override
    public String toString() {
        return "Post: Id: " + id + "userId" + userId + " title: " + title + " content: " + content;
    }
}
