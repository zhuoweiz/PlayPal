package com.example.server.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

public class UserData {
	private Long id;
	private String name;
	private String email;
	private String fid;
	private String bio;
/*	@Temporal(value = TemporalType.TIMESTAMP)
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "America/Bogota")*/
	private List<TagData> tags;

	public UserData() {
	}
//	public UserData(Long id, String name, String email) {
//		this.id = id;
//		this.name = name;
//		this.email = email;
//	}

	public void setId(Long id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setFid(String fid) { this.fid = fid; }

	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getEmail() {
		return email;
	}
	public String getFid() { return fid; }

	public String getBio() { return bio; }
	public void setBio(String bio) { this.bio = bio; }
	public List<TagData> getTags() { return tags; }
	public void setTags(List<TagData> tags) { this.tags = tags; }

	@Override
	public String toString() {
		return "Id: " + id + " name: " + name + " email: " + email;
	}
}
