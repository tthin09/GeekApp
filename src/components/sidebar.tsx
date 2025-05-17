"use client"

import { IoAlbumsOutline } from "react-icons/io5";
import { FaUsersRectangle } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";


export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (path: string) => {``
    return pathname.substring(0, path.length) === path;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen);
  }

  const activeClass = "bg-blue-200";

  return (
    <>
    <aside className={`fixed z-10 flex flex-col w-[200px] h-full px-2 bg-background transition-all duration-300 ${
      isSidebarOpen ? "max-xl:hidden" : ""
    }`}>
      <Link href="/albums">
        <img
          src="/assets/geekup-logo.svg"
          alt="Web logo"
          className="pl-2 py-6"
          style={{ width: 'auto', height: '80%', objectFit: 'contain' }}
        />
      </Link>
      <Link
        href="/albums"
        className={`flex items-center w-full rounded-lg px-6 py-2 mb-2 ${
          isActive("/albums") ? activeClass : "hover:bg-gray-200"
        }`}>
        <IoAlbumsOutline className="mr-4" />
        <p>Albums</p>
      </Link>
      <Link
        href="/users"
        className={`flex items-center w-full rounded-lg px-6 py-2 mb-2 ${
          isActive("/users") ? activeClass : "hover:bg-gray-200"
        }`}>
        <FaUsersRectangle className="mr-4" />
        <p>Users</p>
      </Link>

    </aside>
    {/* Toggle sidebar (not developed yet) */}
    {/* <div className={`xl:hidden fixed mt-[64px] ${
      isSidebarOpen ? "ml-[200px]" : ""
    }`}>
      <button
        onClick={toggleSidebar}
        className={`cursor-pointer bg-white flex w-full justify-center p-2 border-2 border-l-0 border-gray-300 rounded-tr-xl rounded-br-xl`}
      >
        <TfiMenuAlt />
      </button>
    </div> */}
    </>
  );
};