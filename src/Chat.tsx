import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ollama from 'ollama/browser';  // Make sure to use the correct import

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage = {
        sender: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        avatar: '/public/human.png',
        fallback: 'YOU'
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      const message = { role: 'user', content: newMessage };
      let fullAIResponse = "";  // To accumulate full AI response
      try {
        const response = await ollama.chat({
          model: 'phi3',
          messages: [message],
          stream: true
        });

        for await (const part of response) {
          if (part.message && part.message.content) {
            fullAIResponse += part.message.content + " ";
            // Update only the last AI message part without re-rendering all messages
            setMessages(prevMessages => {
              const newMessages = [...prevMessages];
              if (!newMessages[newMessages.length - 1] || newMessages[newMessages.length - 1].sender !== 'AI') {
                newMessages.push({
                  sender: 'AI',
                  message: fullAIResponse,
                  timestamp: new Date().toLocaleTimeString(),
                  avatar: '/public/ai.jpg',
                  fallback: 'AI'
                });
              } else {
                newMessages[newMessages.length - 1].message = fullAIResponse;
              }
              return newMessages;
            });
          }
        }
      } catch (error) {
        console.error("Error handling streaming response:", error);
      }

      setNewMessage('');
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
        <Input placeholder="Type a message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <Button onClick={handleSendMessage} type="submit">Send</Button>
      </CardFooter>
    </Card>
  );
}
