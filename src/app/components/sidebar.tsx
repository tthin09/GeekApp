"use client"

import { IoAlbumsOutline } from "react-icons/io5";
import { FaUsersRectangle } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const activeClass = "bg-blue-200";

  return (
    <div className="w-[200px]">
      <Link
        href="/albums"
        className={`flex items-center w-full px-6 py-2 ${
          isActive("/albums") ? activeClass : ""
        }`}>
        <IoAlbumsOutline className="mr-4" />
        <p>Albums</p>
      </Link>
      <Link
        href="/users"
        className={`flex items-center w-full px-6 py-2 ${
          isActive("/users") ? activeClass : ""
        }`}>
        <FaUsersRectangle className="mr-4" />
        <p>Users</p>
      </Link>
    </div>
  );
};