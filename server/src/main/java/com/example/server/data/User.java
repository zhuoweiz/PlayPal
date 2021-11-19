package com.example.server.data;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "Users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String email;

	// do i really need this
//	@OneToOne(mappedBy = "creator",
//		fetch = FetchType.LAZY,
//		cascade = CascadeType.ALL)
//	private Post post;

	@OneToMany(mappedBy="creator",
		fetch = FetchType.LAZY,
		cascade = CascadeType.ALL
	)
	private Set<Post> createdPosts;

	public User() {
	}

	public User(String name, String email) {
		this.name = name;
		this.email = email;
	}

	public void setId(Long id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getEmail() {
		return email;
	}

	@Override
	public String toString() {
		return "User: Id: " + id + " name: " + name + " email: " + email;
	}
}
