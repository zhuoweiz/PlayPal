package com.example.server.dto;

import com.example.server.data.Post;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.Type;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class PostData {
    private Long id;
    private String title;
    private String content;
    private Long creatorId;
    private UserData creator;

    private String location;
//    @Type(type = "numeric_boolean")
    private Boolean isVirtual;
    private String dateTime;
    private List<TagData> tags;

//    private Set<CommentData> comments;
//    private Set<TagData> tags;

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

    public List<TagData> getTags() {
        return tags;
    }

    public void setTags(List<TagData> tags) {
        this.tags = tags;
    }

    public UserData getCreator() {
        return creator;
    }

    public void setLocation(String location) {this.location = location;}
    public void setIsVirtual(Boolean isVirtual) {this.isVirtual = isVirtual; }
    public void setDateTime(String dateTime) {this.dateTime = dateTime; }

    public String getLocation() { return location; }
    public Boolean getIsVirtual() { return isVirtual; }
    public String getDateTime() { return dateTime; }

    @Override
    public String toString() {
        return "Post: Id: " + id + " creatorId " + creatorId + " title: " + title + " content: " + content;
    }
}
