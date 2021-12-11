package com.example.server.controller;

import com.example.server.dto.PostData;
import com.example.server.dto.TagData;
import com.example.server.dto.UserData;
import com.example.server.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;

//import com.mashape.unirest.http.HttpResponse;
//import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import javax.annotation.Resource;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

//	private static final Object API_KEY = ;
//	private static final String YOUR_DOMAIN_NAME = ;
	private static RequestEntity<Object> Unirest;
	@Resource(name = "userService")
	private UserService userService;

	/**
	 * <p>Get all user data in the system.For production system you many want to use
	 * pagination.</p>
	 * @return List<UserData>
	 */
	@GetMapping
	public List<UserData> getUsers() {
		return userService.getAllUsers();
	}

	/**
	 * Method to get the user data based on the ID.
	 * @param id
	 * @return UserData
	 */
	@GetMapping("/user/{id}")
	public ResponseEntity<UserData> getUser(@PathVariable Long id) {
		System.out.println(" === GET USER BY ID ===");
		return new ResponseEntity<UserData>(userService.getUserById(id), HttpStatus.ACCEPTED);
	}

	@GetMapping("/user/tags/{id}")
	public ResponseEntity<List<TagData>> getTagsByUser(@PathVariable Long id) {
		return new ResponseEntity<List<TagData>>(userService.getTagsByUser(id), HttpStatus.ACCEPTED);
	}

	@GetMapping("/user/{id}/{otherId}")
	public Boolean getOtherUser(
			@PathVariable Long id,
			@PathVariable Long otherId){
		return userService.getOtherUserById(id, otherId);
	}

	@GetMapping("/user/like/{id}/{postId}")
	public Boolean checkLikedPost(
			@PathVariable Long id,
			@PathVariable Long postId) {
		return userService.checkLikedPostById(id, postId);
	}

	@GetMapping("/user/join/{id}/{postId}")
	public Boolean checkJoinedPost(
			@PathVariable Long id,
			@PathVariable Long postId) {
		return userService.checkJoinedPostById(id, postId);
	}

	@GetMapping("/user/createdPosts/{id}")
	public ResponseEntity<List<PostData>> getCreatedPosts(@PathVariable Long id) {
		return new ResponseEntity<List<PostData>>(userService.getCreatedPosts(id), HttpStatus.ACCEPTED);
	}

	@GetMapping("/user/likedPosts/{id}")
	public ResponseEntity<List<PostData>> getLikedPosts(@PathVariable Long id) {
		return new ResponseEntity<List<PostData>>(userService.getLikedPosts(id), HttpStatus.ACCEPTED);
	}

	@GetMapping("/user/usersFollowing/{uid}")
	public ResponseEntity<List<UserData>> getUsersFollowing(@PathVariable Long uid) {
		return new ResponseEntity<List<UserData>>(userService.getUsersFollowing(uid), HttpStatus.ACCEPTED);
	}

	@GetMapping("/user/joinedPosts/{id}")
	public ResponseEntity<List<PostData>> getJoinedPosts(@PathVariable Long id) {
		return new ResponseEntity<List<PostData>>(userService.getJoinedPosts(id), HttpStatus.ACCEPTED);
	}

	@GetMapping("/uid")
	public ResponseEntity<Long> getUid(@RequestParam(value = "fid") String fid) {
		return new ResponseEntity<Long>(userService.getUserId(fid), HttpStatus.ACCEPTED);
	}

	@PostMapping("/follow/{followerId}/{followeeId}")
	public boolean followUser(
		@PathVariable Long followerId,
		@PathVariable Long followeeId
	) {
		return userService.followUser(followerId, followeeId);
	}

	@PostMapping("/unfollow/{followerId}/{followeeId}")
	public boolean unfollowUser(
		@PathVariable Long followerId,
		@PathVariable Long followeeId
	) {
		return userService.unfollowUser(followerId, followeeId);
	}

	@PostMapping("/user/update")
	public UserData updateUserProfile(
		final @RequestBody UserData userData
	) {
		return userService.updateUser(userData);
	}


	/**
	 * Post request to create user information int the system.
	 * @param userData
	 * @return
	 */
	@PostMapping("/user")
	public UserData saveUser(final @RequestBody UserData userData) {
		System.out.println("Post new user === " + userData.toString());
		return userService.saveUser(userData);
	}

	@GetMapping("/like")
	public boolean likePost(
			@RequestParam(value = "postId") Long postId,
			@RequestParam(value = "userId") Long userId)
	{
		return userService.likePost(userId, postId);
	}

	@GetMapping("/unlike")
	public boolean unlikePost(
			@RequestParam(value = "postId") Long postId,
			@RequestParam(value = "userId") Long userId)
	{
		return userService.unlikePost(userId, postId);

	}

	@GetMapping("/join")
	public boolean joinPost(
			@RequestParam(value = "postId") Long postId,
			@RequestParam(value = "userId") Long userId)
	{
		return userService.joinPost(userId, postId);
	}

	@GetMapping("/unjoin")
	public boolean unjoinPost(
			@RequestParam(value = "postId") Long postId,
			@RequestParam(value = "userId") Long userId)
	{
		return userService.unjoinPost(userId, postId);
	}

	@GetMapping("/searchUser")
	public List<UserData> searchUserByName(
		@RequestParam(value = "keyword") String keyword
	) {
		return userService.searchUserByName(keyword);
	}

//	public static JsonNode sendSimpleMessage() throws UnirestException {
//
//		HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/messages")
//				.basicAuth("api", API_KEY)
//				.field("from", "Excited User <USER@YOURDOMAIN.COM>")
//				.field("to", "artemis@example.com")
//				.field("subject", "hello")
//				.field("text", "testing")
//				.asJson();
//
//		return request.getBody();
//	}

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
