package com.example.server.service;

import com.example.server.data.Post;
import com.example.server.dto.PostData;
import com.example.server.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service("postService")
public class DefaultPostService implements PostService {
    @Autowired
    private PostRepository postRepo;

    /**
     * Create a user based on the data sent to the service class.
     * @param postData
     * @return DTO representation of the user
     */
    @Override
    public PostData savePost(PostData postData) {
        Post postInstance = populatePostEntity(postData);
        return populatePostData((postRepo.save(postInstance)));
    }

    /**
     * Delete pet based on the user ID.We can also use other option to delete user
     * based on the entity (passing JPA entity class as method parameter)
     * @param postId
     * @return boolean flag showing the request status
     */
    @Override
    public boolean deletePost(Long postId) {
        postRepo.deleteById(postId);
        return true;
    }

    /**
     * Method to return the list of all the users in the system. This is a simple
     * implementation but use pagination in the real world example.
     * @return list of user
     */
    @Override
    public List<PostData> getAllPosts() {
        List<PostData> postData = new ArrayList<>();
        List<Post> postList = postRepo.findAll();
        postList.forEach(post -> {
            postData.add(populatePostData(post));
        });
        return postData;
    }

    /**
     * Get user by ID. The service will send the user data else will throw the exception.
     * @param postId
     * @return UserData
     */
    @Override
    public PostData getPostById(long postId) {
        return populatePostData(postRepo.findById(postId).orElseThrow(() ->
                new EntityNotFoundException("Post not found!")
        ));
    }

    /**
     * Internal method to convert User JPA entity to the DTO object
     * for frontend data
     * @param post
     * @return UserData
     */
    private PostData populatePostData(final Post post){
        PostData postData = new PostData();
        postData.setId(post.getId());
        postData.setUserId(post.getUserId());
        postData.setTitle(post.getTitle());
        postData.setContent(post.getContent());

        return postData;
    }

    /**
     * Method to map the frontend user object to the JPA customer entity.
     * @param postData
     * @return User
     */
    private Post populatePostEntity(PostData postData){
        Post post = new Post();
        post.setUserId(postData.getUserId());
        post.setTitle(postData.getTitle());
        post.setContent(postData.getContent());
        return post;
    }
}
