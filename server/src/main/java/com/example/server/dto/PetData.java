package com.example.server.dto;

public class PetData {
	private Long id;
	private String name;
	private String owner;

	public PetData() {

	}

	public void setId(Long id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}

	public long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getOwner() {
		return owner;
	}
}
