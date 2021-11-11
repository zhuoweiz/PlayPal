package com.example.server.data;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Pet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String owner;

	public Pet() {
	}

	public Pet(String name, String owner) {
		this.name = name;
		this.owner = name;
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
