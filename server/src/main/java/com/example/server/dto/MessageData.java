package com.example.server.dto;



public class MessageData {
    private Long id;
    private Long senderId;
    private UserData sender;
    private Long postId;
    private PostData post;
    private String content;

    public MessageData() {}


    public void setId(Long id) {this.id = id;}
    public Long getId() {return id;}

    public void setSenderId(Long senderId) {this.senderId = senderId;}
    public Long getSenderId() {return senderId;}

    public void setSender(UserData sender) { this.sender = sender; }
    public UserData getSender() { return sender; }

    public void setPostId(Long postId) {this.postId = postId;}
    public Long getPostId() {return postId;}

    public void setPost(PostData post) { this.post = post; }
    public PostData getPost() { return post; }

    public void setContent(String content) {this.content = content;}
    public String getContent() {return content;}

    @Override
    public String toString() {return "Message: Id" +id + "senderId: " + senderId + "postId: " + postId + "content: " + content;}

}
