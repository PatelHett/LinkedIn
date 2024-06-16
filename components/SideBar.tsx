import Image from "next/image";
import React, { use } from "react";
import ProfilePhoto from "./shared/ProfilePhoto";
import { getAllPosts } from "@/lib/serverActions";

async function SideBar({ user }: { user: any }) {

  const post = await getAllPosts();

  return (
    <div className="hidden md:block w-[20%] h-fit border border-gray-300 bg-white rounded">
      <div className="flex relative flex-col items-center">
        <div className="w-full h-16 overflow-hidden">
          {user && (
            <Image
              src={"/4.jpg"}
              alt="Banner"
              width={200}
              height={200}
              className="w-full h-full rounded-t"
            />
          )}
        </div>
        <div className="my-1 absolute top-10 left-[40%]">
          <ProfilePhoto src={user ? user?.imageUrl! : "/4.jpg"} />
        </div>
        <div className="border-b border-b-gray-300">
          <div className="p-2 mt-5 text-center">
            <h1 className="font-bold hover:underline cursor-pointer">
              {user ? `${user?.firstName} ${user?.lastName}` : "Patel Stack"}
            </h1>
            <p className="text-xs">
              @{user ? `${user?.username}` : "username"}
            </p>
          </div>
        </div>
      </div>
      <div className="text-xs">
        <div className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer">
          <p>Post Impressions</p>
          <p className="text-blue-500 font-bold">88</p>
        </div>
        <div className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer">
          <p>Post</p>
          <p className="text-blue-500 font-bold">{post.length}</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
