package com.example.server.data;


import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Messages")
public class Message extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    private Long userId;
//    private Long postId;
//    private Timestamp time;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", referencedColumnName = "id")
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private Post post;


    public Message(){

    }
    public Message(String content){
//        this.userId = senderId;
//        this.postId = postId;
//        this.time = new Timestamp(System.currentTimeMillis());
        this.content = content;
    }

    public void setId(Long id) {this.id = id;}
    public Long getId() {return id;}

//    public void setUserId(Long userId) {this.userId = userId;}
    public Long getSenderId() {return sender.getId();}

//    public void setPostId(Long postId) {this.postId = postId;}
    public Long getPostId() {return post.getId();}

    public void setSender(User user) { sender = user; }
    public User getSender() { return sender; }

    public void setPost(Post post_instance) { post = post_instance; }
    public Post getPost() { return post; }
    //    public void setTime(Timestamp time) {this.time = time;}
//    public Timestamp getTime() {return time;}

    public void setContent(String content) {this.content = content;}
    public String getContent() {return content;}

    @Override
    public String toString() {return "Message: Id" +id + "senderId: " + sender.getId() + "postId: " + post.getId()  + "content" + content;}
}
