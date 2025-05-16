"use client";

import { useState, useEffect } from "react";
import { User } from "@/lib/types";
import { ClipLoader } from "react-spinners";
import Table from "./table";
import { useRouter, useSearchParams } from "next/navigation";


export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = searchParams.get("current") ? parseInt(searchParams.get("current")!, 10) : 1;
  const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")!, 10) : 20;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user/get-all', {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-full h-fit bg-gray-100 py-[1px]">
      <h1 className="font-bold text-xl mx-6 mt-6">Users</h1>
      <div className="font-normal m-6 flex flex-col">
        {isLoading ? (
          <ClipLoader loading={isLoading} />
        ) : (
          <Table
            users={users}
            currentPage={currentPage}
            pageSize={pageSize}/>
        )}
        
      </div>
    </div>
  );
}