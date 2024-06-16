import { IPostDocument } from "@/models/post.model";
import Image from "next/image";
import React from "react";

function PostContent({ post }: { post: IPostDocument }) {
  return (
    <div className="my-3">
      <p className="my-3 px-4">{post?.description}</p>
      {post?.imageUrl && (
        <Image
          src={post.imageUrl}
          width={400}
          height={200}
          alt="post-image"
          className="w-full sm:h-[500px] lg:h-[400px] lg:w-[600px] mx-auto"
        />
      )}
    </div>
  );
}

export default PostContent;
