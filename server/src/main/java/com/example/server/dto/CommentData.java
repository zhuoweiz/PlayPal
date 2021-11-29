package com.example.server.dto;

import com.example.server.data.User;

public class CommentData {
    private Long id;
    private Long postId;
    private Long creatorId;
    private String content;
    private UserData creator;
    private PostData post;
    public CommentData() {}

    public void setId(Long id) { this.id = id; }
    public void setPostId(Long creatorId){ this.postId = creatorId; }
    public void setSender(UserData sender) { this.creator = sender; }
    public void setPost(PostData post) { this.post = post; }
    public void setSenderId(Long userId){ this.creatorId = userId; }
    public void setContent(String content) { this.content = content; }
    public Long getSenderId() {return creator.getId();}
    public UserData getSender() { return creator; }
    public PostData getPost() { return post; }
    public Long getId() { return id; }
    public Long getPostId() { return postId; }
    public String getContent() { return content; }

    @Override
    public String toString() {
        return "Post: Id: " + id + "senderId" + creatorId + " content: " + content;
    }
}
