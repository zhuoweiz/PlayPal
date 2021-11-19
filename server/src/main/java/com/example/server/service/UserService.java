package com.example.server.service;

import com.example.server.dto.PostData;
import com.example.server.dto.UserData;
import java.util.List;

public interface UserService {
	UserData saveUser(UserData user);
	boolean deleteUser(final Long userId);
	List<UserData> getAllUsers();
	UserData getUserById(final long userId);
	List<PostData> getUserPosts(final long userId);
}
