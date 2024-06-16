import {
  Bell,
  BriefcaseBusiness,
  Home,
  MessageCircleMore,
  Users,
  icons,
} from "lucide-react";
import Link from "next/link";
import React from "react";

type NAVITEMS = {
  src: string;
  icon: JSX.Element;
  text: string;
};
//method -2
// interface NAVITEMS= {
//     src:string,
//     icon:JSX.Element,
//     text:string
// }

const navItems: NAVITEMS[] = [
  {
    src: "/home",
    icon: <Home />,
    text: "Home",
  },
  {
    src: "/networks",
    icon: <Users />,
    text: "My Networks",
  },
  {
    src: "/job",
    icon: <BriefcaseBusiness />,
    text: "Jobs",
  },
  {
    src: "/message",
    icon: <MessageCircleMore />,
    text: "Messaging",
  },
  {
    src: "/notifications",
    icon: <Bell />,
    text: "Notification",
  },
];

export default function NavItems() {
  return (
    <div className="flex gap-8">
      {navItems.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer text-[#666666] hover:text-black"
          >
            <span>{item.icon}</span>
            <Link className="text-xs" href={item.src}>{item.text}</Link>
          </div>
        );
      })}
    </div>
  );
}
