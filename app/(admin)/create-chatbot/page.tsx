"use client";

import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CREATE_CHATBOT } from "@/graphql/mutations/mutations";
import { useMutation } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { FormEvent, useState } from "react";
export default function CreateChatbot() {
  const router = useRouter();
  const [name, setName] = useState("");

  const { user } = useUser(); //fetching user deatils from clerk to pass on as ID to CREATE_CHATBOT
  const [createChatbot, { data, error, loading }] = useMutation(
    CREATE_CHATBOT,
    {
      variables: {
        clerk_user_id: user?.id,
        name,
      },
    }
  );
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const createdAt = new Date().toISOString(); // Get the current timestamp in ISO format
      const data = await createChatbot({
        variables: {
          clerk_user_id: user?.id,
          name,
          created_at: createdAt, // Add the created_at variable
        },
      });
      setName("");
      router.push(`/edit-chatbot/${data.data.insertChatbots.id}`);
    } catch (error) {
      console.log("ERROR WHILE CREATING CHATBOT!", error);
    }
  };
  

  if (!user) {
    return null;
  }
  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:space-x-10 bg-white p-10 rounded-md m-10">
      <Avatar seed="create-chatbot" />
      <div>
        <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
        <h2 className="font-light">
          Create a new chatbot to help you assist in your conversations with
          customers
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 mt-4"
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
            placeholder="Chatbot Name"
            className="max-w-lg"
          />
          <Button type="submit" disabled={loading || !name}>
            {loading ? "Creating Chatbot" : "Create Chatbot"}
          </Button>
        </form>
        <p className="text-gray-300 mt-5">Example: Customer Support Chatbot</p>
      </div>
    </div>
  );
}
