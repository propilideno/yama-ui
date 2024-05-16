import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: 'AI',
      message: "I'm a large language model i don't have feelings, but if i was a human i should answer 'I am fine, and you?'",
      timestamp: '19:42',
      avatar: '/public/ai.jpg',
      fallback: 'AI'
    },
    {
      sender: 'You',
      message: 'Hello, how are you?',
      timestamp: '19:41',
      avatar: '/public/human.png',
      fallback: 'YOU'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        sender: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        avatar: '/public/human.png',
        fallback: 'YOU'
      };
      setMessages([...messages, newMsg]);
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
