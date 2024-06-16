"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import SearchInput from "./SearchInput";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "./NavItems";
import { Button } from "./ui/button";
import { useParams, useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const params = useParams();

  const handleIcon = (e: any) => {
    if (params === null) {
      e.preventDefault();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="flex items-center max-w-6xl justify-between h-14 mx-auto px-3">
        <div className="flex items-center gap-2">
          <Image
            src="/LinkedIn_logo.webp"
            alt="Logo"
            width={35}
            height={35}
            onClick={handleIcon}
            className="hover:cursor-pointer"
          />
          <div className="md:block hidden">
            <SearchInput />
          </div>
        </div>
        <div className=" flex items-center gap-5">
          <div className="md:block hidden">
            <NavItems />
          </div>
        </div>
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button className="rounded-full" variant={"secondary"}>
              <SignInButton />
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
