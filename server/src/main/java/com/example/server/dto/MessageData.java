package com.example.server.dto;

import java.sql.Timestamp;

public class MessageData {
    private Long id;
    private Long userId;
    private Long postId;
    private Timestamp time;
    private String content;

    public MessageData() {}


    public void setId(Long id) {this.id = id;}
    public Long getId() {return id;}

    public void setUserId(Long userId) {this.userId = userId;}
    public Long getUserId() {return userId;}

    public void setPostId(Long postId) {this.postId = postId;}
    public Long getPostId() {return postId;}

    public void setTime(Timestamp time) {this.time = time;}
    public Timestamp getTime() {return time;}

    public void setContent(String content) {this.content = content;}
    public String getContent() {return content;}

    @Override
    public String toString() {return "Id" +id + "userId" + userId + "postId" + postId + "time" + time + "content" + content;}

}
