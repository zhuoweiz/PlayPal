package com.example.server.service;

import com.example.server.dto.PostData;
import com.example.server.dto.TagData;
import com.example.server.dto.UserData;
import java.util.List;

public interface UserService {
	UserData saveUser(UserData user);
	boolean deleteUser(final Long userId);
	List<UserData> getAllUsers();
	UserData getUserById(final long userId);
	//List<PostData> getUserPosts(final long userId);
	long getUserId(String fid);
	List<PostData> getCreatedPosts(final long postId);
	List<PostData> getLikedPosts(final long userId);
	boolean likePost(final long userId, final long postId);
	boolean followUser(final long followerId, final long followeeId);
	boolean unfollowUser(final long followerId, final long followeeId);
	List<UserData> getUsersFollowing(final long userId);
	boolean unlikePost(final long userId, final long postId);
	List<PostData> getJoinedPosts(final long userId);
	boolean joinPost(final long userId, final long postId);
	boolean unjoinPost(final long userId, final long postId);
	Boolean getOtherUserById(long userId, long otherUserId);
  	Boolean checkLikedPostById(long userId, long postId);
	Boolean checkJoinedPostById(long userId, long postId);
	List<TagData> getTagsByUser(long userId);
	UserData updateUser(UserData userData);
	List<UserData> searchUserByName(final String keyword);
}
