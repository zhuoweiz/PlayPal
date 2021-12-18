package com.example.server.controller;

import com.example.server.dto.MessageData;
import com.example.server.service.MessageService;
import com.example.server.utils.MyExceptionHandler;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://143.198.190.9"})
@RestController
@RequestMapping("/messages")
public class MessageController {

    @Resource(name="messageService")
    private MessageService messageService;

    /**
     * Method to get all the messages for a certain post.
     * @param id
     * @return List<MessageData>
     */
    @GetMapping("/bypost/{id}")
    public List<MessageData> getMessages(@PathVariable Long id){
        System.out.println("=== GET Message BY PostID ===");
        return messageService.getMessagesByPostId(id);
    }

    /**
     * Method to get the attributes of a certain message based on id.
     * @param id
     * @return MessageData
     */
    @GetMapping("/message/{id}")
    public MessageData getMessage(@PathVariable Long id){
        System.out.println("=== GET Message BY ID ===");
        return messageService.getMessageById(id);
    }

    /**
     * Method to post a message
     * @param headers
     * @param messageData
     * @return MessageData
     */
    @PostMapping("/message")
    public MessageData saveMessage(@RequestHeader HttpHeaders headers,
            final @RequestBody MessageData messageData) {
        System.out.println("Message new message === " + messageData.toString());
        MyExceptionHandler.TokenValidationHandler(headers);
        return messageService.saveMessage(messageData);
    }

    /**
     * Method to delete a certain message.
     * @param headers
     * @param id
     * @return Boolean
     */
    @DeleteMapping("/message/{id}")
    public Boolean deleteComment(@RequestHeader HttpHeaders headers,
            @PathVariable Long id)
    {
        MyExceptionHandler.TokenValidationHandler(headers);
        return messageService.deleteMessage(id);
    }
}
