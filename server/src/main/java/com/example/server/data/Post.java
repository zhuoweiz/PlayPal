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
    private Boolean isVirtual;

    private String dateTime;

    private Double lat;
    private Double lng;

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

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "joins",
            joinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    private Set<User> joinedUsers;



    public Post() {
    }

    public Post(String title, String content,  String location, Boolean isVirtual, String dateTime) {
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
    public void setIsVirtual(Boolean isVirtual) {this.isVirtual = isVirtual; }
    public void setDateTime(String dateTime) {this.dateTime = dateTime; }
    public String getLocation() {return location;}
    public Boolean getIsVirtual() {return isVirtual; }
    public String getDateTime() {return dateTime; }

    public Set<User> getJoinedUsers() {
        return joinedUsers;
    }

    public void setJoinedUsers(Set<User> joinedUsers) {
        this.joinedUsers = joinedUsers;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

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
    public void setTags(Set<Tag> tags){this.tags = tags;}
    public Set<Comment> getComments() {return comments;}
    public void setComments(Set<Comment> comments) {this.comments = comments;}

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Post))
            return false;
        Post post = (Post)o;
        if (this.id == post.getId()){
            return true;
        }
        return false;
    }
    @Override
    public int hashCode(){
        return id.hashCode();
    }

    @Override
    public String toString() {
        return "Post: Id: " + id + "creatorId" + creator.getId() + " title: " + title + " content: " + content;
    }
}
