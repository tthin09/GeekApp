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
    <aside className="fixed z-10 h-full w-[200px] px-2 bg-background">
      <Link href="/albums">
        <img
          src="/assets/geekup-logo.svg"
          alt="Web logo"
          className="pl-2 py-6"
          style={{ width: '70%', height: 'auto', objectFit: 'contain' }}
        />
      </Link>
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
    </aside>
  );
};