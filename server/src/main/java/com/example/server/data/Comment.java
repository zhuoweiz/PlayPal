package com.example.server.data;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.sql.Time;

@Entity
@Table(name = "Comments")
public class Comment extends Auditable<String>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id")
    private User creator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    public Comment(){
    }
    public Comment(int userId, String content) {
        this.content = content;
    }


    public void setId(Long id) {
        this.id = id;
    }
    public void setCreator(User user) { creator = user; }
    public void setContent(String content) {
        this.content = content;
    }
    public Long getId() {
        return id;
    }

    public Long getCreatorId() {return creator.getId();}
    public Long getPostId() {return post.getId();}
    public User getCreator() { return creator; }
    public String getContent() {
        return content;
    }

    public void setPost(Post post) { this.post = post; }
    public Post getPost() { return this.post; }

    @Override
    public String toString() {
        return "Comment: Id: " + id + "senderId" + creator.getId() + "postId" + post.getId() + " content: " + content;
    }
}
