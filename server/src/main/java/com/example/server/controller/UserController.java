package com.example.server.controller;

import com.example.server.dto.PostData;
import com.example.server.dto.TagData;
import com.example.server.dto.UserData;
import com.example.server.service.UserService;
import com.example.server.utils.MyExceptionHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;

//import com.mashape.unirest.http.HttpResponse;
//import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.Resource;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://143.198.190.9"})
@RestController
@RequestMapping("/users")
public class UserController {

	public static void bob() {

	}

	@Resource(name = "userService")
	private UserService userService;

	/**
	 * <p>Get all user data in the system.For production system you many want to use
	 * pagination.</p>
	 * @return List<UserData>
	 */
	@GetMapping
	public List<UserData> getUsers(@RequestHeader HttpHeaders headers) {
		MyExceptionHandler.TokenValidationHandler(headers);
		return userService.getAllUsers();
	}

	/**
	 * Method to get the user data based on the ID.
	 * @param id
	 * @return UserData
	 */
	@GetMapping("/user/{id}")
	public ResponseEntity<UserData> getUser(@RequestHeader HttpHeaders headers, @PathVariable Long id) {
		MyExceptionHandler.TokenValidationHandler(headers);
		return new ResponseEntity<UserData>(userService.getUserById(id), HttpStatus.ACCEPTED);
	}

	/**
	 * Get the tags a user has.
	 * @param id
	 * @return List<TagData>
	 */
	@GetMapping("/user/tags/{id}")
	public ResponseEntity<List<TagData>> getTagsByUser(@RequestHeader HttpHeaders headers, @PathVariable Long id) {
		MyExceptionHandler.TokenValidationHandler(headers);
		return new ResponseEntity<List<TagData>>(userService.getTagsByUser(id), HttpStatus.ACCEPTED);
	}

	/**
	 * Check if the other user if being followed by me
	 * @param id
	 * @param otherId
	 * @return Boolean
	 */
	@GetMapping("/user/{id}/{otherId}")
	public Boolean getOtherUser(
			@PathVariable Long id,
			@PathVariable Long otherId){
		return userService.getOtherUserById(id, otherId);
	}

	/**
	 * Check if the post is liked by the user
	 * @param id
	 * @param postId
	 * @return Boolean
	 */
	@GetMapping("/user/like/{id}/{postId}")
	public Boolean checkLikedPost(
			@PathVariable Long id,
			@PathVariable Long postId) {
		return userService.checkLikedPostById(id, postId);
	}

	/**
	 * Check if the post is joined by the user
	 * @param id
	 * @param postId
	 * @return Boolean
	 */
	@GetMapping("/user/join/{id}/{postId}")
	public Boolean checkJoinedPost(
			@PathVariable Long id,
			@PathVariable Long postId) {
		return userService.checkJoinedPostById(id, postId);
	}

	/**
	 * Fetch a list of created posts from the user
	 * @param id
	 * @return List<PostData>
	 */
	@GetMapping("/user/createdPosts/{id}")
	public ResponseEntity<List<PostData>> getCreatedPosts(@RequestHeader HttpHeaders headers, @PathVariable Long id) {
		MyExceptionHandler.TokenValidationHandler(headers);
		return new ResponseEntity<List<PostData>>(userService.getCreatedPosts(id), HttpStatus.ACCEPTED);
	}

	/**
	 * Fetch a list of posts liked by the user
	 * @param id
	 * @return List<PostData>
	 */
	@GetMapping("/user/likedPosts/{id}")
	public ResponseEntity<List<PostData>> getLikedPosts(@RequestHeader HttpHeaders headers, @PathVariable Long id) {
		MyExceptionHandler.TokenValidationHandler(headers);
		return new ResponseEntity<List<PostData>>(userService.getLikedPosts(id), HttpStatus.ACCEPTED);
	}

	/**
	 * Fetch a list of users being followed by the requesting user
	 * @param uid
	 * @return List of UserData
	 */
	@GetMapping("/user/usersFollowing/{uid}")
	public ResponseEntity<List<UserData>> getUsersFollowing(@RequestHeader HttpHeaders headers, @PathVariable Long uid) {
		MyExceptionHandler.TokenValidationHandler(headers);
		return new ResponseEntity<List<UserData>>(userService.getUsersFollowing(uid), HttpStatus.ACCEPTED);
	}

	/**
	 * Fetch a list of posts joined by the requesting user
	 * @param id
	 * @return List of PostData
	 */
	@GetMapping("/user/joinedPosts/{id}")
	public ResponseEntity<List<PostData>> getJoinedPosts(@RequestHeader HttpHeaders headers, @PathVariable Long id) {
		MyExceptionHandler.TokenValidationHandler(headers);
		return new ResponseEntity<List<PostData>>(userService.getJoinedPosts(id), HttpStatus.ACCEPTED);
	}

	/**
	 * Fetch the custom uid with the firebase provided uid
	 * @param fid
	 * @return Long uid
	 */
	@GetMapping("/uid")
	public ResponseEntity<Long> getUid(@RequestParam(value = "fid") String fid) {
		return new ResponseEntity<Long>(userService.getUserId(fid), HttpStatus.ACCEPTED);
	}

	/**
	 * The action of following a user
	 * @param followerId
	 * @param followeeId
	 * @return boolean
	 */
	@PostMapping("/follow/{followerId}/{followeeId}")
	public boolean followUser(@RequestHeader HttpHeaders headers,
							  @PathVariable Long followerId,
							  @PathVariable Long followeeId
	) {
		MyExceptionHandler.TokenValidationHandler(headers);
		return userService.followUser(followerId, followeeId);
	}

	/**
	 * The action of un-following a user
	 * @param followerId
	 * @param followeeId
	 * @return boolean
	 */
	@PostMapping("/unfollow/{followerId}/{followeeId}")
	public boolean unfollowUser(@RequestHeader HttpHeaders headers,
		@PathVariable Long followerId,
		@PathVariable Long followeeId
	) {
		MyExceptionHandler.TokenValidationHandler(headers);
		return userService.unfollowUser(followerId, followeeId);
	}

	/**
	 * Update user profile, bio and tags.
	 * @param userData
	 * @return UserData
	 */
	@PostMapping("/user/update")
	public UserData updateUserProfile(@RequestHeader HttpHeaders headers,
		final @RequestBody UserData userData
	) {
		MyExceptionHandler.TokenValidationHandler(headers);
		return userService.updateUser(userData);
	}


	/**
	 * Post request to create a new int the system.
	 * @param userData
	 * @return UserData
	 */
	@PostMapping("/user")
	public UserData saveUser(final @RequestBody UserData userData) {
		return userService.saveUser(userData);
	}

	/**
	 * The action of liking a post by a user.
	 * @param postId
	 * @param userId
	 * @return boolean
	 */
	@GetMapping("/like")
	public boolean likePost(@RequestHeader HttpHeaders headers,
			@RequestParam(value = "postId") Long postId,
			@RequestParam(value = "userId") Long userId)
	{
		MyExceptionHandler.TokenValidationHandler(headers);
		return userService.likePost(userId, postId);
	}

	/**
	 * The action of unliking a post by a user
	 * @param postId
	 * @param userId
	 * @return boolean
	 */
	@GetMapping("/unlike")
	public boolean unlikePost(@RequestHeader HttpHeaders headers,
			@RequestParam(value = "postId") Long postId,
			@RequestParam(value = "userId") Long userId)
	{
		MyExceptionHandler.TokenValidationHandler(headers);
		return userService.unlikePost(userId, postId);
	}

	/**
	 * The Action of joining a post by a user
	 * @param postId
	 * @param userId
	 * @return boolean
	 */
	@GetMapping("/join")
	public boolean joinPost(@RequestHeader HttpHeaders headers,
			@RequestParam(value = "postId") Long postId,
			@RequestParam(value = "userId") Long userId)
	{
		MyExceptionHandler.TokenValidationHandler(headers);
		return userService.joinPost(userId, postId);
	}

	/**
	 * The action of unjoining a post by a user
	 * @param postId
	 * @param userId
	 * @return boolean
	 */
	@GetMapping("/unjoin")
	public boolean unjoinPost(@RequestHeader HttpHeaders headers,
			@RequestParam(value = "postId") Long postId,
			@RequestParam(value = "userId") Long userId)
	{
		MyExceptionHandler.TokenValidationHandler(headers);
		return userService.unjoinPost(userId, postId);
	}

	/**
	 * The action of searching for users by names, through keyword
	 * @param keyword
	 * @return List of userdata
	 */
	@GetMapping("/searchUser")
	public List<UserData> searchUserByName(@RequestHeader HttpHeaders headers,
		@RequestParam(value = "keyword") String keyword
	) {
		MyExceptionHandler.TokenValidationHandler(headers);
		return userService.searchUserByName(keyword);
	}

	/**
	 * <p>Delete user from the system based on the ID. The method mapping is like the getUser with difference of
	 * @DeleteMapping and @GetMapping</p>
	 * @param id
	 * @return
	 */
	@DeleteMapping("/user/{id}")
	public Boolean deleteUser(@PathVariable Long id) {
		return userService.deleteUser(id);
	}
}
