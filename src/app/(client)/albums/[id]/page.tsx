"use client";

import { useState, useEffect } from "react";
import { User, Album, Photo } from "@/lib/types";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { FaUsersRectangle } from "react-icons/fa6";
import { HiArrowLeft } from "react-icons/hi";
import { hashStringToColor } from "@/lib/utils";
import Link from "next/link";
import Table from "./table";
import PhotoSection from "./photoSection";


export default function Home() {
  const [album, setAlbum] = useState<Album>();
  const [user, setUser] = useState<User>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();

  const currentPage = searchParams.get("current") ? parseInt(searchParams.get("current")!, 10) : 1;
  const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")!, 10) : 20;

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`/api/album/get-with-id?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setAlbum(responseData.data as Album);
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("An unknown error occurred");
        }
      }
    };

    fetchAlbum();
  }, []);

  useEffect(() => {
    if (!album) {
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/get-with-id?id=${album.userId}`, {
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

    const fetchPhotos = async () => {
      try {
        const response = await fetch(`/api/photo/get-with-album-id?albumId=${album.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setPhotos(responseData.data as Photo[]);
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("An unknown error occurred");
        }
      }
    };

    fetchUser();
    fetchPhotos();
  }, [album]);


  return (
    <div className="w-full h-fit bg-gray-100 py-[1px] pt-6">
      <div className="flex items-center mx-6">
        <FaUsersRectangle style={{ color: "gray" }} />
        <a href="/albums" className="py-1 px-2 rounded text-gray-500 hover:text-black hover:bg-gray-200 transition-colors duration-200">Albums</a>
        <span className="ml-1 mr-3">/</span>
        <span>Show</span>
      </div>
      <div className="flex items-center mx-6">
        <Link href="/albums">
          <div className="p-3 rounded hover:bg-gray-300 transition-colors duration-200">
            <HiArrowLeft />
          </div>
        </Link>
        <h1 className="ml-4 font-bold text-2xl">Show Album</h1>
      </div>

      {/* Container */}
      <div className="font-normal m-6 flex flex-col bg-white p-6 rounded">
        <div className="border-1 border-gray-200 rounded p-6">
          {/* User info */}
          <div className="flex w-full border-b-1 border-gray-200 mb-8">
            {user && <>
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=${hashStringToColor(user.name)}`}
                alt={`${user.name}_avatar`}
                className="mr-4"
                style={{ height: "40px", width: "auto", borderRadius: "100%", display: "inline" }}
              />
              <div className="flex flex-col">
                <h2 className="font-bold text-xl mb-4">{user.name}</h2>
                <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-400 transition-colors duration-200 mb-4">{user.email}</a>
              </div>
            </>}
          </div>
          {/* Table */}
          {album && <h2 className="text-xl font-bold my-4">{album.title}</h2>}
          <PhotoSection
            photos={photos}
          />
        </div>
      </div>
    </div>
  );
}