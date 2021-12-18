package com.example.server.controller;

import com.example.server.data.Message;
import com.example.server.dto.MessageData;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

	/**
	 *
	 * @param message
	 * @return
	 * @throws Exception
	 */
	@MessageMapping("/hello")
	@SendTo("/topic/greetings")
	public MessageData greeting(Message message) throws Exception {
		Thread.sleep(1000); // simulated delay
		MessageData responseData = new MessageData();
		responseData.setContent("CHAT: TEST RUN");

		return responseData;
	}
}
