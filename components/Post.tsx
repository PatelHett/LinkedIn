"use client";
import React from "react";
import ProfilePhoto from "./shared/ProfilePhoto";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { IPostDocument } from "@/models/post.model";
import PostContent from "./PostContent";
import SocialOption from "./SocialOption";
import ReactTimeago from "react-timeago";
import { deletePostAction } from "@/lib/serverActions";
import { toast } from "sonner";

const Post = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const fullName = `${post?.user?.firstName} ${post?.user?.lastName}`;
  const userName =
    `${post?.user?.firstName}${post?.user?.lastName}`.toLowerCase();

  let isUser = post?.user?.userId === user?.id;

  return (
    <div className="bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300">
      <div className="flex gap-2 p-4">
        <ProfilePhoto src={post?.user?.profilePhoto!} />
        <div className="flex items-center justify-between w-full">
          <div className="">
            <h1 className="text-sm font-bold">
              {fullName}
              {user?.id === post?.user?.userId && (
                <Badge variant={"secondary"} className="ml-2">
                  You
                </Badge>
              )}
            </h1>
            <p className="text-xs text-gray-500">@{userName}12</p>
            <p className="text-xs text-gray-500">
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>
        </div>
        {isUser ? (
          <div>
            <Button
              onClick={async () => {
                const promise = deletePostAction(String(post._id));
                toast.promise(promise, {
                  loading: "Deleting...",
                  position: "top-right",
                  success: "Post deleted successfully",
                  error: "Failed to delete post. Please try again.",
                  
                });
              }}
              size={"icon"}
              className="rounded-full"
              variant={"outline"}
            >
              <Trash2 />
            </Button>
          </div>
        ) : (
          " "
        )}
      </div>
      <PostContent post={post} />
      <SocialOption post={post} />
    </div>
  );
};

export default Post;
