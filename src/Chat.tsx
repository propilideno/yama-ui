import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ollama from 'ollama/browser';  // Make sure to use the browser version if on the client-side

export function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: 'AI',
      message: "Hello duck, how are you?",
      timestamp: new Date().toLocaleTimeString(),
      avatar: '/public/ai.jpg',
      fallback: 'AI'
    }
  ]);
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
      setMessages([...messages, userMessage]);

      const message = { role: 'user', content: newMessage };
      try {
        const response = await ollama.chat({
          model: 'phi3',  // Make sure to replace 'phi3' with the correct model name if different
          messages: [message],
          stream: true
        });

        for await (const part of response) {
          if (part.message && part.message.content) {
            const aiMessage = {
              sender: 'AI',
              message: part.message.content,
              timestamp: new Date().toLocaleTimeString(),
              avatar: '/public/ai.jpg',
              fallback: 'AI'
            };
            setMessages(prevMessages => [...prevMessages, aiMessage]);
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
