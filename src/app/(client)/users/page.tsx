"use client";

import { useState, useEffect, Suspense } from "react";
import { User } from "@/lib/types";
import { ClipLoader } from "react-spinners";
import Table from "./table";
import { useSearchParams } from "next/navigation";

function Component() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    <>
      {isLoading ? (
        <ClipLoader loading={isLoading} />
      ) : (
        <Table
          users={users}
          currentPage={currentPage}
          pageSize={pageSize}/>
      )}
    </>
  )
}

export default function Home() {
  

  return (
    <div className="w-full h-fit bg-gray-100 py-[1px]">
      <h1 className="font-bold text-xl mx-6 mt-6">Users</h1>
      <div className="font-normal m-6 flex flex-col">
        <Suspense fallback={<ClipLoader />}>
          <Component />
        </Suspense>
      </div>
    </div>
  );
}