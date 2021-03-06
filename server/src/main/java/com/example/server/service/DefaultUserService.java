package com.example.server.service;

import com.example.server.data.Post;
import com.example.server.data.Tag;
import com.example.server.data.User;
import com.example.server.dto.PostData;
import com.example.server.dto.TagData;
import com.example.server.dto.UserData;
import com.example.server.repository.PostRepository;
import com.example.server.repository.TagRepository;
import com.example.server.repository.UserRepository;
import com.example.server.utils.DataMappingUtils;
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
	@Autowired
	private TagRepository tagRepo;

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

	/**
	 * Update the user info.
	 * @param userData
	 * @return UserData
	 */
	@Override
	public UserData updateUser(UserData userData) {
		User existingUser = userRepo.getById(userData.getId());
		if (userData.getBio() != null) {
			existingUser.setBio(userData.getBio());
		}
		List<TagData> tagsData = userData.getTags();

		long uid = existingUser.getId();
		if (tagsData != null) {
			tagRepo.deleteByUserId(uid);
			tagsData.forEach(tagData -> {
				Tag newTag = new Tag();
				newTag.setLabel(tagData.getLabel());
				newTag.setUser(existingUser);
				tagRepo.save(newTag);
			});
		}

		return populateUserData((userRepo.save(existingUser)));
	}

	/**
	 * Method to like a post based on userId and postId
	 * @param userId
	 * @param postId
	 * @return boolean
	 */
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

	/**
	 * Method to create a follow relationship given two userId
	 * @param followerId
	 * @param followeeId
	 * @return boolean
	 */
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

	/**
	 * Method to unfollow a user given two userId.
	 * @param followerId
	 * @param followeeId
	 * @return boolean
	 */
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

	/**
	 * Method to unlike a post given userId and postId.
	 * @param userId
	 * @param postId
	 * @return boolean
	 */
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

	/**
	 * Method to join in a post given userId and postId.
	 * @param userId
	 * @param postId
	 * @return boolean
	 */
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

	/**
	 * Method to unjoin a post given userId and postId.
	 * @param userId
	 * @param postId
	 * @return boolean
	 */
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

	/**
	 * Method to get all the followers for the user given userId.
	 * @param userId
	 * @return List<UserData>
	 */
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

	/**
	 * Method to check whether the follow relationship exists.
	 * @param userId
	 * @param otherUserId
	 * @return boolean
	 */
	@Override
	public Boolean getOtherUserById(long userId, long otherUserId) {
		User user = userRepo.getById(userId);
		User otherUser = userRepo.getById(otherUserId);
		Set<User> usersFollowed = user.getUsersFollowing();
		if (usersFollowed.contains(otherUser)) {
			return true;
		}
		return false;
	}

	/**
	 * Method to check if a user like a certain post given userId and postId.
	 * @param userId
	 * @param postId
	 * @return boolean
	 */
	@Override
	public Boolean checkLikedPostById(long userId, long postId) {
		User user = userRepo.getById(userId);
		Post post = postRepo.getById((postId));
		Set<Post> likedPosts = user.getLikedPosts();
		if (likedPosts.contains(post)) {
			return true;
		}
		return false;
	}

	/**
	 * Method to check whether a user joined in a certain post given userId and postId.
	 * @param userId
	 * @param postId
	 * @return boolean
	 */
	@Override
	public Boolean checkJoinedPostById(long userId, long postId) {
		User user = userRepo.getById(userId);
		Post post = postRepo.getById((postId));
		Set<Post> joinedPosts = user.getJoinedPosts();
		if (joinedPosts.contains(post)) {
			return true;
		}
		return false;
	}

	/**
	 * Method to get the posts that a user created given the user Id.
	 * @param userId
	 * @return List<PostData>
	 */
	@Override
	public List<PostData> getCreatedPosts(long userId) {
		List<PostData> responsePosts = new ArrayList<>();
		User user = userRepo.getById(userId);
		Set<Post> tmp = user.getCreatedPosts();

		for(Post element : tmp) {
			if (!element.getArchive()) {
				responsePosts.add(populatePostData(element));
			}
		}
		return responsePosts;
	}

	/**
	 * Method to get all the post that a certain user liked given a userId.
	 * @param userId
	 * @return List<PostData>
	 */
	@Override
	public List<PostData> getLikedPosts(long userId) {
		List<PostData> responsePosts = new ArrayList<>();
		User user = userRepo.getById(userId);
		Set<Post> tmp = user.getLikedPosts();

		for(Post element : tmp) {
			if (!element.getArchive()) {
				responsePosts.add(populatePostData(element));
			}
		}
		return responsePosts;
	}

	/**
	 * Method to get all the posts that the user joined given the userId.
	 * @param userId
	 * @return List<PostData>
	 */
	@Override
	public List<PostData> getJoinedPosts(long userId) {
		List<PostData> responsePosts = new ArrayList<>();
		User user = userRepo.getById(userId);
		Set<Post> tmp = user.getJoinedPosts();

		for(Post element : tmp) {
			if (!element.getArchive()) {
				responsePosts.add(populatePostData(element));
			}
		}
		return responsePosts;
	}

	/**
	 * Method to get all the archived post for a user given the userId.
	 * @param userId
	 * @return List<PostData>
	 */
	@Override
	public List<PostData> getArchivedPosts(long userId) {
		List<PostData> responsePosts = new ArrayList<>();
		User user = userRepo.getById(userId);
		Set<Post> tmp = user.getCreatedPosts();

		for(Post element : tmp) {
			if (element.getArchive()) {
				responsePosts.add(populatePostData(element));
			}
		}
		return responsePosts;
	}

	/**
	 * Method to get all the interest tags for a user given userId.
	 * @param userId
	 * @return List<TagData>
	 */
	@Override
	public List<TagData> getTagsByUser(long userId) {
		List<TagData> responseTags = new ArrayList<>();
		User user = userRepo.getById(userId);
		Set<Tag> tmp = user.getTags();
		tmp.forEach(tag -> {
			TagData tmpTagData = new TagData();
			tmpTagData.setLabel(tag.getLabel());
			responseTags.add(tmpTagData);
		});

		return responseTags;
	}

	/**
	 * Method to get the users id given the firebase id.
	 * @param fid
	 * @return long
	 */
	@Override
	public long getUserId(String fid) {
		return userRepo.getUserByFid(fid).getId();
	}

	/**
	 * Method to search for a user based on the user name.
	 * @param keyword
	 * @return List<UserData>
	 */
	@Override
	public List<UserData> searchUserByName(String keyword) {
		List<User> searchResult = userRepo.findByNameContainingIgnoreCase(keyword);
		List<UserData> responseUserDataList = new ArrayList<>();

		searchResult.forEach(user -> {
			responseUserDataList.add(populateUserData(user));
		});

		return responseUserDataList;
	}
//	@Override
//	public Boolean checkIsAdminById(long userId){
//		User currentUser = userRepo.getById(userId);
//		UserData currentUserData = populateUserData(currentUser);
//
//		return currentUserData.getIsAdmin();
//
//
//	}

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
		userData.setBio(user.getBio());
		userData.setIsAdmin(user.getIsAdmin());
		Set<Tag> tags = user.getTags();

		if(tags != null) {
			List<TagData> tagsData = new ArrayList<>();
			tags.forEach(tag -> {
				TagData tmpTagData = new TagData();
				tmpTagData.setLabel(tag.getLabel());
				tagsData.add(tmpTagData);
			});
			userData.setTags(tagsData);
		}
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
		user.setBio(userData.getBio());
		return user;
	}

	/**
	 * Method to convert post JPA entity to DTO object for the frontend.
	 * @param post
	 * @return PostData
	 */
	private PostData populatePostData(final Post post){
		PostData postData = new PostData();
		postData.setId(post.getId());
		postData.setCreatorId(post.getCreatorId());

		User user = userRepo.getById(post.getCreatorId());
		postData.setCreator(populateUserData(user));
		postData.setTitle(post.getTitle());
		postData.setContent(post.getContent());
		List<TagData> temp_tagList = new ArrayList<>();
		if(post.getTags() != null){
			post.getTags().forEach(tag -> {
				TagData temp_tagData = DataMappingUtils.populateTagData(tag);
				temp_tagList.add(temp_tagData);
			});
		}
		postData.setTags(temp_tagList);
		postData.setArchive(post.getArchive());

		return postData;
	}
}
