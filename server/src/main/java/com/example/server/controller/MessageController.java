package com.example.server.controller;

import com.example.server.dto.MessageData;
import com.example.server.service.MessageService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://143.198.190.9"})
@RestController
@RequestMapping("/messages")
public class MessageController {

    @Resource(name="messageService")
    private MessageService messageService;

    @GetMapping("/bypost/{id}")
    public List<MessageData> getMessages(@PathVariable Long id){
        System.out.println("=== GET Message BY PostID ===");
        return messageService.getMessagesByPostId(id);
    }

    @GetMapping("/message/{id}")
    public MessageData getMessage(@PathVariable Long id){
        System.out.println("=== GET Message BY ID ===");
        return messageService.getMessageById(id);
    }

    @PostMapping("/message")
    public MessageData saveMessage(final @RequestBody MessageData messageData) {
        System.out.println("Message new message === " + messageData.toString());
        return messageService.saveMessage(messageData);
    }

    @DeleteMapping("/message/{id}")
    public Boolean deleteComment(@PathVariable Long id){
        return messageService.deleteMessage(id);
    }

}
