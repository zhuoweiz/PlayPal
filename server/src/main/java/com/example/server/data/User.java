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
	private String fid;
	private String name;
	private String email;
	private String bio;

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

	@OneToMany(mappedBy="user",
		fetch = FetchType.LAZY,
		cascade = CascadeType.ALL
	)
	private Set<Tag> tags;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "likes",
		joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
		inverseJoinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id")
	)
	private Set<Post> likedPosts;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "follows",
		joinColumns = @JoinColumn(name = "follower_id", referencedColumnName = "id"),
		inverseJoinColumns = @JoinColumn(name = "followee_id", referencedColumnName = "id")
	)
	private Set<User> usersFollowing;

  @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "joins",
			joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id")
	)
	private Set<Post> joinedPosts;

	public User() {
	}

	public User(String name, String email) {
		this.name = name;
		this.email = email;
	}

	public void setId(Long id) { this.id = id; }
	public void setName(String name) { this.name = name; }
	public void setEmail(String email) { this.email = email; }
	public void setFid(String fid) { this.fid = fid; }

	public Long getId() { return id; }
	public String getName() { return name; }
	public String getEmail() { return email; }
	public String getFid() { return fid; }
	public Set<Post> getCreatedPosts() {return createdPosts; }
	public Set<Post> getLikedPosts() { return likedPosts; }
	public void setLikedPosts(Set<Post> likedPosts) { this.likedPosts = likedPosts; }
	public Set<Tag> getTags() { return tags; }
	public void setTags(Set<Tag> tags) { this.tags = tags; }
	public Set<User> getUsersFollowing() { return usersFollowing; }
	public void setUsersFollowing(Set<User> usersFollowing) { this.usersFollowing = usersFollowing; }
	public Set<Post> getJoinedPosts() {return joinedPosts;}
	public void setJoinedPosts(Set<Post> joinedPosts) {this.joinedPosts = joinedPosts;}

	public String getBio() { return bio; }
	public void setBio(String bio) { this.bio = bio; }

	@Override
	public String toString() {
		return "User: Id: " + id + " name: " + name + " email: " + email;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof User))
			return false;
		User other = (User) o;
		if (this.id == other.getId()) {
			return true;
		}
		return false;
	}
	@Override
	public int hashCode(){
		return id.hashCode();
	}
}
