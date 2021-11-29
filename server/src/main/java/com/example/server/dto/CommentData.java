package com.example.server.dto;

public class CommentData {
    private Long id;
    private Long postId;
    private Long creatorId;
    private String content;

    public CommentData() {}

    public CommentData(Long id, Long postId, Long creatorId, String content) {
        this.id = id;
        this.postId = postId;
        this.creatorId = creatorId;
        this.content = content;
    }

    @Override
    public String toString() {
        return "CommentData{" +
          "id=" + id +
          ", postId=" + postId +
          ", creatorId=" + creatorId +
          ", content='" + content + '\'' +
          '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
