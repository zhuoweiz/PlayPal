package com.example.server.dto;

import com.example.server.data.Post;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

public class PostData {
    private Long id;
    private String title;
    private String content;
    private Long creatorId;
    private UserData creator;
  
    public PostData() {}

    public void setId(Long id) {
        this.id = id;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setContent(String content) {
        this.content = content;
    }


    public Long getId() {
        return id;
    }
    public String getTitle() {
        return title;
    }
    public String getContent() {
        return content;
    }

    public void setCreatorId(Long id) { this.creatorId = id; }
    public Long getCreatorId() { return creatorId; }

    public void setCreator(UserData creatorData) {
        this.creator = creatorData;
    }
    public UserData getCreator() {
        return creator;
    }

    @Override
    public String toString() {
        return "Post: Id: " + id + " creatorId " + creatorId + " title: " + title + " content: " + content;
    }
}
