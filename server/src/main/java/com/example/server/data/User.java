package com.example.server.data;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.Date;
import java.sql.Time;

@Entity
@Table(name = "Users")
public class User extends Auditable<String>{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String email;

	@OneToMany(mappedBy="creator",
		fetch = FetchType.LAZY,
		cascade = CascadeType.ALL
	)
	private Set<Post> createdPosts;

	@OneToMany(mappedBy="creator",
		fetch = FetchType.LAZY,
		cascade = CascadeType.ALL
	)
	private Set<Comment> createdComments;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "likes",
		joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
		inverseJoinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id")
	)
	private Set<Post> likedPosts;

	public User() {
	}

	public User(String name, String email) {
		this.name = name;
		this.email = email;
	}

	public void setId(Long id) { this.id = id; }
	public void setName(String name) { this.name = name; }
	public void setEmail(String email) { this.email = email; }

	public Long getId() { return id; }
	public String getName() { return name; }
	public String getEmail() { return email; }

	public Set<Post> getLikedPosts() { return likedPosts; }
	public void setLikedPosts(Set<Post> likedPosts) { this.likedPosts = likedPosts; }


	@Override
	public String toString() {
		return "User: Id: " + id + " name: " + name + " email: " + email;
	}
}
