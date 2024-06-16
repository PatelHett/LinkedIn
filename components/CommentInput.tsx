"use client";
import React, { useState } from "react";
import ProfilePhoto from "./shared/ProfilePhoto";
import { useUser } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createCommentAction } from "@/lib/serverActions";

const CommentInput = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  const [inputText, setInputText] = useState<string>("");

  const commentActionHandler = async (formData: FormData) => {
    try {
      if (!user) throw new Error("User not authenticated");
      await createCommentAction(postId, formData);
      setInputText("");
    } catch (error) {
      throw new Error("An error occured");
    }
  };

  const changeHandler = (e: any) => {
    setInputText(e.target.value);
  };

  return (
    <form action={(formData) => commentActionHandler(formData)}>
      <div className="flex items-center gap-2">
        <ProfilePhoto src={user?.imageUrl!} />
        <Input
          type="text"
          name="inputText"
          placeholder="Add a comment"
          className="rounded-full"
          onChange={changeHandler}
          value={inputText}
        />
        <Button type="submit" variant={"outline"} className="rounded-full">
          Send
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
