package com.example.server.service;

import com.example.server.dto.MessageData;
import java.util.List;

public interface MessageService {
    MessageData saveMessage(MessageData message);
    boolean deleteMessage(final Long messageId);
    List<MessageData> getMessagesByPostId(final long postId);
    MessageData getMessageById(final long messageId);
}
