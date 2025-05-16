"use client";

import { useState, useEffect } from "react";
import { User } from "@/lib/types";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { FaUsersRectangle } from "react-icons/fa6";
import { HiArrowLeft } from "react-icons/hi";
import { hashStringToColor } from "@/lib/utils";
import Link from "next/link";

const DefaultUser: User = {
  id: "0",
  name: "unknown",
  email: "unknown",
  phone: "unknown",
  website: "unknown",
}

export default function Home() {
  const [user, setUser] = useState<User>(DefaultUser);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();

  const currentPage = searchParams.get("current") ? parseInt(searchParams.get("current")!, 10) : 1;
  const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")!, 10) : 20;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/get-with-id?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setUser(responseData.data as User);
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("An unknown error occurred");
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-full h-fit bg-gray-100 py-[1px] pt-6">
      <div className="flex items-center mx-6">
        <FaUsersRectangle style={{ color: "gray" }} />
        <a href="/users" className="py-1 px-2 rounded text-gray-500 hover:text-black hover:bg-gray-200">Users</a>
        <span className="ml-1 mr-3">/</span>
        <span>Show</span>
      </div>
      <div className="flex items-center mx-6">
        <Link href="/users">
          <div className="p-3 rounded hover:bg-gray-300">
            <HiArrowLeft />
          </div>
        </Link>
        <h1 className="ml-4 font-bold text-xl">Show User</h1>
      </div>
      <div className="font-normal m-6 flex flex-col">
        {/* User info */}
        <div className="flex">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=${hashStringToColor(user.name)}`}
            alt={`${user.name}_avatar`}
            className="mr-4"
            style={{ height: "40px", width: "auto", borderRadius: "100%", display: "inline" }}
          />
        </div>
      </div>
    </div>
  );
}