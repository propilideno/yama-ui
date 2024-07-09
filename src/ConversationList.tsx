// ConversationList.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const backendEndpoint = 'http://localhost:5000/history';

export function ConversationList({ onConversationSelect }: { onConversationSelect: (conversation: any) => void }) {
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(backendEndpoint);
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div className="space-y-4">
      {conversations.map((conversation) => (
        <Card key={conversation._id} className="cursor-pointer" onClick={() => onConversationSelect(conversation)}>
          <CardHeader>
            <CardTitle>{conversation.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{conversation.conversationHistory.length} messages</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
