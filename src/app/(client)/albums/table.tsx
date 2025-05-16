import { FaRegEye } from "react-icons/fa";
import Link from "next/link";
import { Album } from "@/lib/types";
import React from "react";
import { hashStringToColor } from "@/lib/utils";
import { HiChevronLeft, HiChevronRight, HiChevronDoubleLeft, HiChevronDoubleRight, HiDotsHorizontal } from "react-icons/hi";
import PageButton from "@/components/navigate/button"


interface TableProps {
  albums: Album[],
  currentPage: number,
  pageSize: number
}

const Table: React.FC<TableProps> = (props) => {
  const pathname = "/albums";
  const albums = props.albums;
  const currentPage = props.currentPage;
  const pageSize = props.pageSize;
  const pageCount = Math.ceil(albums.length / pageSize);

  const albumStartIdx = (currentPage - 1)*pageSize;
  const albumEndIdx = albumStartIdx + pageSize;

  return (
    <>
    <table className="w-full bg-white rounded-md overflow-hidden mb-4">
      <thead>
        <tr className="text-left bg-gray-50 border-b-1 border-gray-200">
          <th className="p-4 border-r-1 border-gray-200">ID</th>
          <th className="p-4 border-r-1 border-gray-200">Title</th>
          <th className="p-4 border-r-1 border-gray-200">User</th>
          <th className="p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {albums.slice(albumStartIdx, albumEndIdx).map((item, index) => {
          return (
            <tr key={index} className="text-left font-normal border-b-1 border-gray-200 py-2 hover:bg-gray-50">
              <td className="p-4">{item.id}</td>
              <td className="p-4">{item.title}</td>
              <td className="p-4">
                <Link href={`/users/${item.id}`} className="text-blue-600 hover:text-blue-400">
                  <img
                    src={`https://ui-avatars.com/api/?name=${item.username}&background=${hashStringToColor(item.username)}`}
                    alt={`${item.username}_avatar`}
                    className="mr-4"
                    style={{ height: "40px", width: "auto", borderRadius: "100%", display: "inline" }}
                  />
                  <p className="inline">{item.username}</p>
                </Link>
              </td>
              <td className="p-4">
                <div className="border-solid border-1 border-gray-300 rounded">
                  <Link href={`/albums/${item.id}`} className="flex items-center py-1 px-2 hover:bg-gray-100">
                    <FaRegEye className="inline mr-2" />
                    Show
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    {/* Page navigation */}
    <div className="flex gap-x-2 w-full justify-end items-center">
      {/* First page */}
      <Link
        href={{
          pathname: pathname,
          query: { current: 1, pageSize: pageSize }
        }}
      >
        <div className={`flex justify-center items-center w-10 h-10 rounded hover:bg-gray-300`}>
          <HiChevronDoubleLeft />
        </div>
      </Link>
      {/* Previous page */}
      <Link
        href={{
          pathname: pathname,
          query: { current: currentPage - 1, pageSize: pageSize }
        }}
        className={`${currentPage === 1 ? "disabled" : ""}`}
        onClick={(e) => {       // Added onClick handler
          if (currentPage === 1) {
            e.preventDefault(); // Prevent default link behavior
          }
        }}
      >
        <div className={`flex justify-center items-center w-10 h-10 rounded ${
          currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-300"
        }`}>
          <HiChevronLeft />
        </div>
      </Link>
      {/* ... indicator */}
      {currentPage > 3 && (
        <div className={`flex justify-center items-center w-10 h-10 rounded`}>
          <HiDotsHorizontal />
        </div>
      )}

      {/* Page numbers */}
      {Array.from({ length: 5 }, (_, i) => i + (currentPage - 2)).map((number, index) => {
        if (number <= 0 || number > pageCount) {
          return null;
        }
        return (
          <PageButton 
            key={index}
            pathname={pathname}
            pageNum={number}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        );
      })}

      {/* ... indicator */}
      {currentPage <= pageCount - 3 && (
        <div className={`flex justify-center items-center w-10 h-10 rounded`}>
          <HiDotsHorizontal />
        </div>
      )}
      {/* Next page */}
      <Link
        href={{
          pathname: pathname,
          query: { current: currentPage + 1, pageSize: pageSize }
        }}
        className={`${currentPage === pageCount ? "disabled" : ""}`}
        onClick={(e) => {       // Added onClick handler
          if (currentPage === pageCount) {
            e.preventDefault(); // Prevent default link behavior
          }
        }}
      >
        <div className={`flex justify-center items-center w-10 h-10 rounded ${
          currentPage === pageCount ? "cursor-not-allowed" : "hover:bg-gray-300"
        }`}>
          <HiChevronRight />
        </div>
      </Link>
      {/* Last page */}
      <Link
        href={{
          pathname: pathname,
          query: { current: pageCount, pageSize: pageSize }
        }}
      >
        <div className={`flex justify-center items-center w-10 h-10 rounded hover:bg-gray-300`}>
          <HiChevronDoubleRight />
        </div>
      </Link>
    </div>
    </>
  );
}

export default Table;