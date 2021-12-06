package com.example.server.data;


import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Messages")
public class Message extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User sender;

    public Message(){
    }
    public Message(Long id, String content, User sender, Post post) {
        this.id = id;
        this.content = content;
        this.sender = sender;
        this.post = post;
    }

    public void setId(Long id) {this.id = id;}
    public Long getId() {return id;}

//    public void setUserId(Long userId) {this.userId = userId;}
    public Long getSenderId() {return sender.getId();}

//    public void setPostId(Long postId) {this.postId = postId;}
    public Long getPostId() {return post.getId();}

    public void setSender(User sender) { this.sender = sender; }
    public User getSender() { return sender; }

    public void setPost(Post post) { this.post = post; }
    public Post getPost() { return post; }
    //    public void setTime(Timestamp time) {this.time = time;}
//    public Timestamp getTime() {return time;}

    public void setContent(String content) {this.content = content;}
    public String getContent() {return content;}

    @Override
    public String toString() {return "Message: Id" +id + "senderId: " + sender.getId() + "postId: " + post.getId()  + "content" + content;}
}
