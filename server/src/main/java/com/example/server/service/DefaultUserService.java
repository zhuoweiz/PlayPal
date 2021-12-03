package com.example.server.service;

import com.example.server.data.Post;
import com.example.server.data.User;
import com.example.server.dto.PostData;
import com.example.server.dto.UserData;
import com.example.server.repository.PostRepository;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@Service("userService")
public class DefaultUserService implements UserService {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private PostRepository postRepo;

	/**
	 * Create a user based on the data sent to the service class.
	 * @param userData
	 * @return DTO representation of the user
	 */
	@Override
	public UserData saveUser(UserData userData) {
		User userInstance = populateUserEntity(userData);
		return populateUserData((userRepo.save(userInstance)));
	}

	@Override
	public boolean likePost(final long userId, final long postId) {
		Post tmppost = postRepo.getById(postId);
		User tmpuser = userRepo.getById(userId);

		Set<Post> likedPost = tmpuser.getLikedPosts();

		if (likedPost.contains(tmppost)){
			return false;
		}
		else {
			likedPost.add(tmppost);
			tmpuser.setLikedPosts(likedPost);
			userRepo.save(tmpuser);
			return true;
		}
	}

	@Override
	public boolean followUser(long followerId, long followeeId) {
		User follower = userRepo.getById(followerId);
		User followee = userRepo.getById(followeeId);

		Set<User> usersFollowing = follower.getUsersFollowing();

		if (usersFollowing.contains(followee)){
			return false;
		}
		else {
			usersFollowing.add(followee);
			follower.setUsersFollowing(usersFollowing);
			userRepo.save(follower);
			return true;
    }
	}

	@Override
	public boolean unfollowUser(long followerId, long followeeId) {
		User follower = userRepo.getById(followerId);
		User followee = userRepo.getById(followeeId);
		Set<User> usersFollowing = follower.getUsersFollowing();

		if (usersFollowing.contains(followee)) {
			usersFollowing.remove(followee);
			userRepo.save(follower);
			return true;
		}

		return false;
	}

	@Override
	public boolean unlikePost(final long userId, final long postId) {
		Post tmppost = postRepo.getById(postId);
		User tmpuser = userRepo.getById(userId);

		Set<Post> likedPost = tmpuser.getLikedPosts();

		if (likedPost.contains(tmppost)) {
			likedPost.remove(tmppost);
			userRepo.save(tmpuser);
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public boolean joinPost(final long userId, final long postId){
		Post tmppost = postRepo.getById(postId);
		User tmpuser = userRepo.getById(userId);

		Set<Post> joinedPost = tmpuser.getJoinedPosts();
		if (joinedPost.contains(tmppost)){
			return false;
		}
		else {
			joinedPost.add(tmppost);
			tmpuser.setJoinedPosts(joinedPost);
			userRepo.save(tmpuser);
			return true;
		}
	}

	@Override
	public boolean unjoinPost(final long userId, final long postId) {
		Post tmppost = postRepo.getById(postId);
		User tmpuser = userRepo.getById(userId);

		Set<Post> joinedPost = tmpuser.getJoinedPosts();

		if (joinedPost.contains(tmppost)) {
			joinedPost.remove(tmppost);
			userRepo.save(tmpuser);
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public List<UserData> getUsersFollowing(long userId) {
		User user = userRepo.getById(userId);
		Set<User> usersFollowed = user.getUsersFollowing();

		List<UserData> responeList = new ArrayList<>();
		for(User tmpUser : usersFollowed) {
			responeList.add(populateUserData(tmpUser));
		}
		return responeList;
	}
	/**
	 * Delete pet based on the user ID.We can also use other option to delete user
	 * based on the entity (passing JPA entity class as method parameter)
	 * @param userId
	 * @return boolean flag showing the request status
	 */
	@Override
	public boolean deleteUser(Long userId) {
		userRepo.deleteById(userId);
		return true;
	}

	/**
	 * Method to return the list of all the users in the system. This is a simple
	 * implementation but use pagination in the real world example.
	 * @return list of user
	 */
	@Override
	public List<UserData> getAllUsers() {
		List<UserData> userData = new ArrayList<>();
		List<User> userList = userRepo.findAll();
		userList.forEach(user -> {
			userData.add(populateUserData(user));
		});
		return userData;
	}

	/**
	 * Get user by ID. The service will send the user data else will throw the exception.
	 * @param userId
	 * @return UserData
	 */
	@Override
	public UserData getUserById(long userId) {
		return populateUserData(userRepo.findById(userId).orElseThrow(() ->
			new EntityNotFoundException("User not found!")
		));
	}

	@Override
	public List<PostData> getCreatedPosts(long userId) {
		List<PostData> responsePosts = new ArrayList<>();
		User user = userRepo.getById(userId);
		Set<Post> tmp = user.getCreatedPosts();

		for(Post element : tmp) {
			responsePosts.add(populatePostData(element));
		}

		return responsePosts;
	}

	@Override
	public List<PostData> getLikedPosts(long userId) {
		List<PostData> responsePosts = new ArrayList<>();
		User user = userRepo.getById(userId);
		Set<Post> tmp = user.getLikedPosts();

		for(Post element : tmp) {
			responsePosts.add(populatePostData(element));
		}

		return responsePosts;
	}

	@Override
	public List<PostData> getJoinedPosts(long userId) {
		List<PostData> responsePosts = new ArrayList<>();
		User user = userRepo.getById(userId);
		Set<Post> tmp = user.getJoinedPosts();

		for(Post element : tmp) {
			responsePosts.add(populatePostData(element));
		}

		return responsePosts;
	}

	@Override
	public long getUserId(String fid) {
		return userRepo.getUserByFid(fid).getId();
	}

	/**
	 * Internal method to convert User JPA entity to the DTO object
	 * for frontend data
	 * @param user
	 * @return UserData
	 */
	private UserData populateUserData(final User user){
		UserData userData = new UserData();
		userData.setId(user.getId());
		userData.setName(user.getName());
		userData.setEmail(user.getEmail());
		// Do not return fid to the client.

		return userData;
	}

	/**
	 * Method to map the frontend user object to the JPA customer entity.
	 * @param userData
	 * @return User
	 */
	private User populateUserEntity(UserData userData){
		User user = new User();
		user.setName(userData.getName());
		user.setEmail(userData.getEmail());
		user.setFid(userData.getFid());
		return user;
	}

	private PostData populatePostData(final Post post){
		PostData postData = new PostData();
		postData.setId(post.getId());
		postData.setCreatorId(post.getCreatorId());

		User user = userRepo.getById(post.getCreatorId());
		postData.setCreator(populateUserData(user));

		postData.setTitle(post.getTitle());
		postData.setContent(post.getContent());

		return postData;
	}
}
