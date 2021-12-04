package com.example.server.controller;

import com.example.server.dto.PostData;
import com.example.server.dto.UserData;
import com.example.server.service.PostService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/posts")
public class PostController {

    @Resource(name = "postService")
    private PostService postService;

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
     * Method to get the user data based on the ID.
     * @param id
     * @return UserData
     */
    @GetMapping("/post/{id}")
    public PostData getPost(@PathVariable Long id) {
        System.out.println(" === GET POST BY ID ===");
        return postService.getPostById(id);
    }

    @GetMapping("/fullPost/{id}")
    public PostData getFullPost(@PathVariable Long id) {
        System.out.println(" === GET FULL POST (with comments and other data) BY ID ===");
        return postService.getFullPostById(id);
    }

    @GetMapping("/postcreator/{id}")
    public UserData getCreator(@PathVariable Long id) {
        return postService.getPostCreator(id);
    }

    /**
     * Post request to create user information int the system.
     * @param postData
     * @return
     */
    @PostMapping("/post")

    public PostData savePost(final @RequestBody PostData postData) {

        System.out.println("Post new post === " + postData.toString());
        return postService.savePost(postData);
    }




    /**
     * <p>Delete user from the system based on the ID. The method mapping is like the getUser with difference of
     * @DeleteMapping and @GetMapping</p>
     * @param id
     * @return
     */
    @DeleteMapping("/post/{id}")
    public Boolean deletePost(@PathVariable Long id) {
        return postService.deletePost(id);
    }

    @GetMapping("/post")
    public List<PostData> searchPosts(@RequestParam(value = "keyword") String keyword) {
        return postService.searchPosts(keyword);
    }
}
