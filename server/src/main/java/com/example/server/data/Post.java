package com.example.server.data;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.sql.Time;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Posts")
public class Post extends Auditable<String>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
//    private Long creatorId;
    private String location;

    @Type(type = "numeric_boolean")
    private boolean isVirtual;

    private String dateTime;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", referencedColumnName = "id")
    private User creator;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Comment> comments;

    @OneToMany(mappedBy="post",
      fetch = FetchType.LAZY,
      cascade = CascadeType.ALL
    )
    private Set<Tag> tags;


    public Post() {
    }

    public Post(String title, String content,  String location, boolean isVirtual, String dateTime) {
        this.title = title;
        this.content = content;
//        this.creatorId = creatorId;
        this.location = location;
        this.isVirtual = isVirtual;
        this.dateTime = dateTime;
    }

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

    public void setLocation(String location) { this.location = location; }
    public void setIsVirtual(boolean isVirtual) {this.isVirtual = isVirtual; }
    public void setDateTime(String dateTime) {this.dateTime = dateTime; }
    public String getLocation() {return location;}
    public boolean getIsVirtual() {return isVirtual; }
    public String getDateTime() {return dateTime; }

    public Long getCreatorId() {
        return creator.getId();
    }
    public void setCreator(User user) {
        creator = user;
    }
    public User getCreator() {
        return creator;
    }
    public Set<Tag> getTags() {
        return tags;
    }
    public boolean equals(Post post) {
        if (this.id == post.getId()){
            return true;
        }
        return false;
    }
    public int hashcode(){
        return id.hashCode();
    }

    @Override
    public String toString() {
        return "Post: Id: " + id + "creatorId" + creator.getId() + " title: " + title + " content: " + content;
    }
}
