// ConversationList.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const backendEndpoint = 'http://localhost:5000/history';

export function ConversationList({ onConversationSelect }: { onConversationSelect: (conversation: any) => void }) {
  const [conversations, setConversations] = useState<any[]>([]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get(backendEndpoint);
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchConversations(); // Initial fetch
    const intervalId = setInterval(fetchConversations, 500); // Fetch every 500 miliseconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="mr-10">
      <div className="font-bold bg-slate-200 text-center rounded-full mb-3"> History </div>
      <div className="w-[300px] h-[665px] p-2 overflow-auto"> {/* Ensure max height and overflow */}
      {conversations.map((conversation) => (
        <Card key={conversation._id} className="cursor-pointer mb-2" onClick={() => onConversationSelect(conversation)}>
          <CardHeader>
            <CardTitle>{conversation.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{conversation.conversationHistory.length} messages</p>
          </CardContent>
        </Card>
      ))}
      </div>
    </div>
  );
}
