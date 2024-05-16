import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ollama from 'ollama/browser';  // Ensuring correct import

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const appendMessage = (sender, message, avatar, fallback) => {
    const timestamp = new Date().toLocaleTimeString();
    setMessages(prevMessages => [...prevMessages, { sender, message, timestamp, avatar, fallback }]);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    appendMessage('You', newMessage, '/public/human.png', 'YOU');
    
    const message = { role: 'user', content: newMessage };
    try {
      const response = await ollama.chat({
        model: 'phi3',
        messages: [message],
        stream: true
      });

      let aiResponse = "";
      for await (const part of response) {
        if (part.message && part.message.content) {
          aiResponse += part.message.content;
          // Update the last AI message or add a new one if it's the first part
          setMessages(prevMessages => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            if (lastMessage && lastMessage.sender === 'AI') {
              return prevMessages.map((msg, idx) => idx === prevMessages.length - 1 ? { ...msg, message: aiResponse } : msg);
            } else {
              return [...prevMessages, {
                sender: 'AI', 
                message: aiResponse, 
                timestamp: new Date().toLocaleTimeString(), 
                avatar: '/public/ai.jpg', 
                fallback: 'AI' 
              }];
            }
          });
        }
      }
    } catch (error) {
      console.error("Error handling streaming response:", error);
    }

    setNewMessage('');

  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent the default action to avoid a new line in case of a textarea or form submission in case of single line input
      handleSendMessage();
    }
  };

  return (
    <Card className="w-[400px] h-[700px] mx-auto grid grid-rows-[min-content_1fr_min-content]">
      <CardHeader>
        <CardTitle>Yama Chat</CardTitle>
        <CardDescription>You can interact with your LLM models here</CardDescription>
        <p>History</p>
      </CardHeader>
      <CardContent className="space-y-4 overflow-auto">
        {messages.map((msg, index) => (
          <div key={index}>
            <div className="flex space-x-2 font-semibold">
              <Avatar>
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.fallback}</AvatarFallback>
              </Avatar>
              <div className="flex-none">
                <p>{msg.sender}</p>
                <p className="text-sm">{msg.timestamp}</p>
              </div>
            </div>
            <p>{msg.message}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Input placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleSendMessage} type="submit">Send</Button>
      </CardFooter>
    </Card>
  );
}
