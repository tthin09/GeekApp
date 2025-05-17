"use client";

import { useState, useEffect, Suspense } from "react";
import { Album } from "@/lib/types";
import { ClipLoader } from "react-spinners";
import Table from "./table";
import { useRouter, useSearchParams } from "next/navigation";

function Component() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = searchParams.get("current") ? parseInt(searchParams.get("current")!, 10) : 1;
  const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")!, 10) : 20;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('/api/album/get-all', {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <>
      {isLoading ? (
        <ClipLoader loading={isLoading} />
      ) : (
        <Table
          albums={albums}
          currentPage={currentPage}
          pageSize={pageSize}/>
      )}
    </>
  )
}

export default function Home() {
  

  return (
    <div className="w-full h-fit bg-gray-100 py-[1px]">
      <h1 className="font-bold text-xl mx-6 mt-6">Albums</h1>
      <div className="font-normal m-6 flex flex-col">
        <Suspense fallback={<ClipLoader />}>
          <Component />
        </Suspense>
      </div>
    </div>
  );
}