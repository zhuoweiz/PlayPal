package com.example.server.dto;

public class UserData {
	private Long id;
	private String name;
	private String email;

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
		return "Id: " + id + " name: " + name + " email: " + email;
	}
}
