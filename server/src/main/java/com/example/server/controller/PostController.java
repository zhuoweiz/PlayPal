package com.example.server.controller;

import com.example.server.dto.PostData;
import com.example.server.dto.UserData;
import com.example.server.service.PostService;
import com.example.server.service.TagService;
import com.example.server.utils.MyExceptionHandler;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.text.ParseException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/posts")
public class PostController {

    @Resource(name = "postService")
    private PostService postService;

    @Resource(name = "tagService")
    private TagService tagService;

    /**
     * <p>Get all user data in the system.For production system you many want to use
     * pagination.</p>
     * @return List<UserData>
     */
    @GetMapping
    public List<PostData> getPosts() {
        return postService.getAllPosts();
    }

    /**
     * Method to get the post data based on the ID.
     * @param id
     * @return PostData
     */
    @GetMapping("/post/{id}")
    public PostData getPost(@PathVariable Long id) {
        System.out.println(" === GET POST BY ID ===");
        return postService.getPostById(id);
    }

    /**
     * Method to get all the attributes of a post.
     * @param id
     * @return PostData
     */
    @GetMapping("/fullPost/{id}")
    public PostData getFullPost(@PathVariable Long id) {
        System.out.println(" === GET FULL POST (with comments and other data) BY ID ===");
        return postService.getFullPostById(id);
    }

    /**
     * Method to get the UserData of the creator of the post.
     * @param id
     * @return UserData
     */
    @GetMapping("/postcreator/{id}")
    public UserData getCreator(@PathVariable Long id) {
        return postService.getPostCreator(id);
    }

    /**
     * Post request to create post information int the system.
     * @param postData
     * @return PostData
     */
    @PostMapping("/post")
    public PostData savePost(@RequestHeader HttpHeaders headers,
                             final @RequestBody PostData postData)
    {
        MyExceptionHandler.TokenValidationHandler(headers);
        System.out.println("Post new post === " + postData.toString());
        return postService.savePost(postData);
    }

    /**
     * Get method to get all the users that joined in a certain post.
     * @param postId
     * @return List<UserData>
     */
    @GetMapping("/joined/{postId}")
    public List<UserData> getJoinedUsers(@PathVariable Long postId) {
        return postService.getJoinedUsers(postId);
    }

    /**
     * Delete post from the system based on the ID.
     * @param id
     * @return Boolean
     */
    @DeleteMapping("/post/{id}")
    public Boolean deletePost(@RequestHeader HttpHeaders headers,
            @PathVariable Long id)
    {
        MyExceptionHandler.TokenValidationHandler(headers);
        return postService.deletePost(id);
    }

    /**
     * Get method to search for related posts based on a keyword.
     * @param keyword
     * @return List<PostData>
     * @throws ParseException
     */
    @GetMapping("/post")
    public List<PostData> searchPosts(@RequestParam(value = "keyword") String keyword) throws ParseException {
        return postService.searchPosts(keyword);
    }

    /**
     * Method to mark a post as archive.
     * @param headers
     * @param postId
     * @return boolean
     */
    @GetMapping("/archive")
    public boolean archivePost(
            @RequestHeader HttpHeaders headers,
            @RequestParam(value = "postId") Long postId)
    {
        MyExceptionHandler.TokenValidationHandler(headers);
        return postService.archivePost(postId);
    }

    /**
     * Method to unarchive a post.
     * @param headers
     * @param postId
     * @return boolean
     */
    @GetMapping("/unarchive")
    public boolean unarchivePost(
            @RequestHeader HttpHeaders headers,
            @RequestParam(value = "postId") Long postId)
    {
        MyExceptionHandler.TokenValidationHandler(headers);
        return postService.unarchivePost(postId);
    }

    /**
     * Method to search for posts based on the user latitude and longitude, used in our recommendation system.
     * @param lat
     * @param lng
     * @return List<PostData>
     */
    @GetMapping("/searchPostByLatLng")
    public List<PostData> searchPostByLat(
      @RequestParam(value = "lat") double lat,
      @RequestParam(value = "lng") double lng
    ) {
        return postService.searchPostByLatLng(lat, lng);
    }

    /**
     * Method to search for posts based on the user interest tags, also used in the recommendation system.
     * @param id
     * @return List<PostData>
     */
    @GetMapping("/searchPostByUserInterest/{id}")
    public List<PostData> searchPostByUserInterest(@PathVariable long id) {
        return postService.searchPostByUserInterest(id);
    }

    /**
     * Method to search for post based on a interest tag.
     * @param keyword
     * @return List<PostData>
     */
    @GetMapping("/searchPostByTag")
    public List<PostData> searchPostByTag(@RequestParam(value = "keyword") String keyword) {
        return postService.searchPostByTag(keyword);
    }
}
