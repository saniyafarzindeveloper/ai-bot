import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

export default function CreateChatbot() {
  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:space-x-10 bg-white p-10 rounded-md m-10">
        <Avatar seed="create-chatbot"/>
        <div>
            <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
            <h2 className="font-light">Create a new chatbot to help you assist in your conversations with customers</h2>
            <form className="flex flex-col md:flex-row gap-4 mt-4">
                <Input required type="text" placeholder="Chatbot Name" className="max-w-lg" />
                <Button>
                    Create Chatbot
                </Button>
            </form>
        </div>
    </div>
  )
}
