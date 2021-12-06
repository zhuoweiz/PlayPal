package com.example.server.service;

import com.example.server.data.Post;
import com.example.server.data.Tag;
import com.example.server.data.User;
import com.example.server.dto.CommentData;
import com.example.server.dto.PostData;
import com.example.server.dto.TagData;
import com.example.server.dto.UserData;
import com.example.server.repository.PostRepository;
import com.example.server.repository.TagRepository;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;

import com.example.server.utils.DataMappingUtils;
@Service("postService")
public class DefaultPostService implements PostService {
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private TagRepository tagRepo;

    /**
     * Create a user based on the data sent to the service class.
     * @param postData
     * @return DTO representation of the user
     */
    @Override
    public PostData savePost(PostData postData) {
        List<TagData> temp_tags = postData.getTags();
        Set<Tag> temp_set= new HashSet<>();

        Post postInstance = populatePostEntity(postData);
        Post temp_post = postRepo.save(postInstance);
        temp_tags.forEach(tagData -> {
            Tag temp_tag = new Tag();
            temp_tag.setLabel(tagData.getLabel());
            temp_tag.setPost(temp_post);
//            temp_set.add(temp_tag);
            tagRepo.save(temp_tag);
        });

        return populatePostData(temp_post);
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
     * @return PostData
     */
    @Override
    public PostData getPostById(long postId) {
        Post post = postRepo.findById(postId).orElseThrow(() ->
            new EntityNotFoundException("Post not found!"));

        return populatePostData(post);
    }

    @Override
    public PostData getFullPostById(long postId) {
        Post post = postRepo.findById(postId).orElseThrow(() ->
          new EntityNotFoundException("Post not found!"));
        PostData responsePostData = populatePostData(post);

        // add comments
        if(post.getComments() != null) {
            List<CommentData> commentDataList = new ArrayList<>();
            post.getComments().forEach(comment -> {
                CommentData tmpCommentData = DataMappingUtils.populateCommentData(comment);
                commentDataList.add(tmpCommentData);
            });
            responsePostData.setComments(commentDataList);
        }

        // can add chat and stuff later

        return responsePostData;
    }

    @Override
    public UserData getPostCreator(long postId) {
        Post post = postRepo.findById(postId).orElseThrow(() ->
          new EntityNotFoundException("Post not found!"));
        return populatePostData(post).getCreator();
    }

    @Override
    public List<UserData> getJoinedUsers(long postId) {
        /*List<User> joinedUsers= userRepo.findByPostId(postId);
        List<UserData> result = new ArrayList<>();
        joinedUsers.forEach(user -> {
            UserData tmpuser = new UserData();
            tmpuser.setName(user.getName());
            tmpuser.setId(user.getId());
            result.add(tmpuser);
        });
        return result;*/
        List<UserData> responseUsers = new ArrayList<>();
        Post post = postRepo.getById(postId);
        Set<User> tmp = post.getJoinedUsers();

        for (User element: tmp) {
            responseUsers.add(populateUserData(element));
        }
        return responseUsers;
    }

    /*
    * Search for posts match with the searchKeyword. return empty list if no posts found
    * @param searchKeyword
    * return ArrayList<PostData>
     */
    @Override
    public List<PostData> searchPosts(String searchKeyword) {
        List<PostData> matchPosts = new ArrayList<>();
        List<Post> postList = postRepo.findAll();
        for (Post p: postList) {
            String content = p.getContent();
            String title = p.getTitle();
            String[] splitContent = content.split("\\s+");
            String[] splitTitle = title.split("\\s+");
            boolean exist = false;
            for (String s: splitContent) {
                if (s.equals(searchKeyword)) {
                    exist = true;
                    break;
                }
            }
            for (String s: splitTitle) {
                if (s.equals(searchKeyword)) {
                    exist = true;
                    break;
                }
            }
            if (exist) {
                matchPosts.add(populatePostData(p));
            }
        }
        if (matchPosts.size() == 0) {
            System.out.println("No matched posts found!");
        }
        return matchPosts;
    }

    @Override
    public List<PostData> searchPostByTag(String searchString) {
        List<PostData> responseList = new ArrayList<>();
        List<Tag> searchResult = tagRepo.findByLabelContainingAndPostIdIsNotNull(searchString);
        searchResult.forEach(tag -> {
            responseList.add(populatePostData(tag.getPost()));
        });

        return responseList;
    }

    @Override
    public List<PostData> searchPostByUserInterest(long userId) {
        User user = userRepo.getById(userId);
        Set<Tag> Tags = user.getTags();
        List<String> userTags = new ArrayList<>();
        for (Tag element : Tags) {
            userTags.add(element.getLabel());
        }
        Set<PostData> responseSet = new HashSet<>();
        userTags.forEach(string -> {
            List<PostData> tmp = searchPostByTag(string);
            tmp.forEach(postData -> {
                if (postData.getIsVirtual()) {
                    responseSet.add(postData);
                }
            });
        });
        return new ArrayList<>(responseSet);
    }

    @Override
    public List<PostData> searchPostByLatLng(double lat, double lng) {
        List<Post> searchResult = postRepo.findByLatBetweenAndLngBetween(lat-0.2, lat+0.2, lng-0.2,lng+0.2);
        List<PostData> responseList = new ArrayList<>();

        searchResult.forEach(post -> {
            responseList.add(populatePostData(post));
        });
        return responseList;
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
        postData.setCreatorId(post.getCreatorId());

        User user = userRepo.getById(post.getCreatorId());
        postData.setCreator(populateUserData(user));

        // add tags
        List<TagData> temp_tagList = new ArrayList<>();
        if(post.getTags() != null){
            post.getTags().forEach(tag -> {
                TagData temp_tagData = DataMappingUtils.populateTagData(tag);
                temp_tagList.add(temp_tagData);
            });
        }
        postData.setTags(temp_tagList);
        postData.setTitle(post.getTitle());
        postData.setContent(post.getContent());
        postData.setLocation(post.getLocation());
        postData.setIsVirtual(post.getIsVirtual());
        postData.setDateTime(post.getDateTime());
        postData.setLat(post.getLat());
        postData.setLng(post.getLng());

        return postData;
    }

    private UserData populateUserData(final User user){
        UserData userData = new UserData();
        userData.setId(user.getId());
        userData.setName(user.getName());
        userData.setEmail(user.getEmail());

        return userData;
    }

    /**
     * Method to map the frontend user object to the JPA customer entity.
     * @param postData
     * @return Post
     */
    private Post populatePostEntity(PostData postData){
        Post post = new Post();
        post.setTitle(postData.getTitle());
        post.setContent(postData.getContent());

//        post.setCreator();
        User user = userRepo.getById(postData.getCreatorId());
        post.setCreator(user);
//        System.out.println("IMPORTANT TEST: " + post.getCreatorId());
        post.setLocation(postData.getLocation());
        post.setIsVirtual(postData.getIsVirtual());
        post.setDateTime(postData.getDateTime());
        post.setLat(postData.getLat());
        post.setLng(postData.getLng());
        return post;
    }
}
