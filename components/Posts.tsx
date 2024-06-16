import React, { Key } from "react";
import Post from "./Post";
import { IPostDocument } from "@/models/post.model";

function Posts({ posts }: { posts: IPostDocument[] }) {
  return (
    <div>
      {posts.map((post) => {
        return <Post key={post._id as Key} post={post} />;
      })}
    </div>
  );
}

export default Posts;
