import { FaRegEye } from "react-icons/fa";
import Link from "next/link";
import { Album } from "@/lib/types";
import React from "react";


interface TableProps {
  data: Album[]
}

const Table: React.FC<TableProps> = (props) => {
  const albums = props.data;

  return (
    <table className="w-full bg-white rounded-md overflow-hidden">
      <thead>
        <tr className="text-left bg-gray-50 border-b-1 border-gray-200">
          <th className="p-4 border-r-1 border-gray-200">ID</th>
          <th className="p-4 border-r-1 border-gray-200">Title</th>
          <th className="p-4 border-r-1 border-gray-200">User</th>
          <th className="p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {albums.map((item, index) => {
          return (
            <tr key={index} className="text-left font-normal border-b-1 border-gray-200 py-2 hover:bg-gray-50">
              <td className="p-4">{item.id}</td>
                  <td className="p-4">{item.title}</td>
                  <td className="p-4">{item.username}</td>
              <td className="p-4">
                <div className="border-solid border-1 border-gray-300 rounded">
                  <Link href={`/users/${item.id}`} className="flex items-center py-1 px-2">
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
  );
}

export default Table;