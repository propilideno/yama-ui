// SavePopUp.tsx
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const backendEndpoint = 'http://localhost:5000/'; // Adjust as per your backend endpoint

export function SavePopUp({ conversationHistory }: { conversationHistory: any[] }) {
  const [conversationName, setConversationName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const saveConversation = async () => {
    setIsSaving(true);

    try {
      const response = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: conversationName,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save conversation");
      }
      console.log("Conversation saved successfully");
    } catch (error) {
      console.error("Error saving conversation:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Save Conversation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Conversation</DialogTitle>
          <DialogDescription>
            Enter a name for the conversation and save it to the database.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="conversationName" className="text-right">
              Name
            </Label>
            <Input
              id="conversationName"
              value={conversationName}
              onChange={(e) => setConversationName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={saveConversation} disabled={isSaving} type="submit">
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
