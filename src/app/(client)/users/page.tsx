"use client";

import { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import Link from "next/link";
import Table from "./table";
import { Spinner } from "@heroui/spinner";
import { ClipLoader } from "react-spinners";
import { Album, User } from "@/lib/types";


export default function Home() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/album/get-all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setAlbums(responseData.data as Album[]);
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("An unknown error occurred");
        }
        return;
      }

      try {
        const response = await fetch("/api/user/get-all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setUsers(responseData.data as User[]);
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("An unknown error occurred");
        }
        return;
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-fit bg-gray-100 py-[1px]">
      <h1 className="font-bold text-xl mx-6 mt-6">Users</h1>
      <div className="font-normal m-6 flex items-center">
        {isLoading ? (
          <ClipLoader loading={isLoading} />
        ) : (
          <Table data={users} />
        )}
        
      </div>
    </div>
  );
}
