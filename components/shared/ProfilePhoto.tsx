import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function ProfilePhoto({ src }: { src: string }) {
  return (
    <div>
      <Avatar className="cursor-pointer">
        <AvatarImage src={src} alt="Banner" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default ProfilePhoto;
