import { Photo } from "@/lib/types";
import React, { useState } from "react";


interface TableProps {
  photos: Photo[],
}

const PhotoSection: React.FC<TableProps> = (props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const photos = props.photos;

  const openPreview = (url: string) => {
    setPreviewUrl(url);
  }

  const closePreview = () => {
    setPreviewUrl(null);
  }

  const getValidUrl = (url: string) => {
    return url.replace("https://via.placeholder.com", "https://dummyjson.com/image");
  }

  return (
    <>
      <div className="flex flex-wrap gap-x-4 gap-y-4">
        {photos.map((item, index) => {
          return (
            <div key={index} className="aspect-square">
              <img 
                src={getValidUrl(item.url)}
                alt={item.title}
                className="w-[150px] object-cover"
                onClick={() => openPreview(getValidUrl(item.url))}
              />
            </div>
          );
        })}
      </div>

      {/* If clicked preview => Go preview mode */}
      {previewUrl && (
        <div onClick={closePreview} className="fixed inset-0 bg-black/80 flex justify-center items-center z-10">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default PhotoSection;