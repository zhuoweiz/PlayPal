package com.example.server.service;

import com.example.server.data.Post;
import com.example.server.data.User;
import com.example.server.data.Message;
import com.example.server.dto.MessageData;
import com.example.server.dto.PostData;
import com.example.server.dto.UserData;
import com.example.server.repository.PostRepository;
import com.example.server.repository.UserRepository;
import com.example.server.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service("messageService")
public class DefaultMessageService implements MessageService {
    @Autowired
    private MessageRepository messageRepo;
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private UserRepository userRepo;
    /**
     * Create a message based on the data sent to the service class.
     * @param messageData
     * @return DTO representation of the message
     */
    @Override
    public MessageData saveMessage(MessageData messageData){
        Message messageInstance = populateMessageEntity(messageData);
        return populateMessageData((messageRepo.save(messageInstance)));

    }


    /**
     * Delete pet based on the message ID.We can also use other option to delete user
     * based on the entity (passing JPA entity class as method parameter)
     * @param messageId
     * @return boolean flag showing the request status
     */
    @Override
    public boolean deleteMessage(Long messageId){
        messageRepo.deleteById(messageId);
        return true;
    }


//TODO
    @Override
    public List<MessageData> getMessagesByPostId(long postId){
        List<MessageData> messageData = new ArrayList<>();
        List<Message> messageList = messageRepo.findAll();
        List<Message> messageList_PostId = new ArrayList<>();
        messageList.forEach(message -> {
            if(message.getPostId() == postId){
                messageList_PostId.add(message);
            }
        });
        messageList_PostId.forEach(message -> {
            messageData.add(populateMessageData(message));
        });

        return messageData;
    }


    /**
     * Get user by ID. The service will send the user data else will throw the exception.
     * @param messageId
     * @return MessageData
     */
    @Override
    public MessageData getMessageById(long messageId) {
        return populateMessageData(messageRepo.findById(messageId).orElseThrow(()->
            new EntityNotFoundException("Message not found")
        ));
    }


    /**
     * Internal method to convert Message JPA entity to the DTO object
     * for frontend data
     * @param message
     * @return MessageData
     */


    private MessageData populateMessageData(final Message message) {
        MessageData messageData = new MessageData();
        messageData.setId(message.getId());
        messageData.setPostId(message.getPostId());
        messageData.setSenderId(message.getSenderId());
//        messageData.setTime(message.getTime());
        User sender = userRepo.getById(message.getSenderId());
        Post post = postRepo.getById((message.getPostId()));
        messageData.setSender(populateUserData(sender));
        messageData.setPost(populatePostData(post));
        messageData.setContent(message.getContent());

        return messageData;
    }

    private UserData populateUserData(final User user){
        UserData userData = new UserData();
        userData.setId(user.getId());
        userData.setName(user.getName());
        userData.setEmail(user.getEmail());

        return userData;
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





    /**
     * Method to map the frontend message object to the JPA message entity.
     * @param messageData
     * @return Message
     */
    private Message populateMessageEntity(MessageData messageData){
        Message message = new Message();
//        message.setPostId(messageData.getPostId());
//        message.setUserId(messageData.getSenderId());
//        message.setTime(messageData.getTime());
        message.setContent(messageData.getContent());
        User sender = userRepo.getById((messageData.getSenderId()));
        message.setSender(sender);
        Post post = postRepo.getById(messageData.getPostId());
        message.setPost(post);


        return message;
    }
}


















