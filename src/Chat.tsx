import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Chat() {
  return (
    <Card className="w-[400px] h-[700px] mx-auto grid grid-rows-[min-content_1fr_min-content]">
      <CardHeader> 
        <CardTitle> Yama Chat </CardTitle>
        <CardDescription> You can interact with your LLM models here </CardDescription>
      <p> History </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex space-x-2 font-semibold">
            <Avatar>
              <AvatarImage src="/public/ai.jpg" />
              <AvatarFallback> AI </AvatarFallback>
            </Avatar>
            <div className="flex-none"> 
              <p> mistral-7b-instruct </p>
              <p className="text-sm"> 19:42 </p>
            </div>
          </div>
          <p> I'm a large language model i don't have feelings, but if i was a human i should answer "I am fine, and you?" </p>
        </div>
        <div className="space-y-1">
          <div className="flex space-x-2 font-semibold">
            <Avatar>
              <AvatarImage src="/public/human.png" />
              <AvatarFallback> YOU </AvatarFallback>
            </Avatar>
            <div className="flex-none"> 
              <p> You </p>
              <p className="text-sm"> 19:41 </p>
            </div>
          </div>
          <p className="text-base"> Hello, how are you? </p>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Input placeholder="Type a message" />
        <Button type="submit"> Send </Button>
      </CardFooter>
    </Card>
  )
}
