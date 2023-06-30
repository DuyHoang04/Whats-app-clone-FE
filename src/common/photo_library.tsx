import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

type photoLibraryType = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  hidePhotoLibrary: React.Dispatch<React.SetStateAction<boolean>>;
};

const PhotoLibrary: React.FC<photoLibraryType> = ({
  setImage,
  hidePhotoLibrary,
}) => {
  const images = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",
  ];

  const setImageToUser = (image: string) => {
    setImage(image);
    hidePhotoLibrary(false);
  };

  return (
    <div className="fixed top-0 left-0 max-h-[100vh] max-w-[100vw] h-full w-full flex  justify-center items-center">
      <div className="h-max w-max bg-gray-900 gap-6 rounded-lg p-4">
        <div
          className="pt-2 pe-2 cursor-pointer flex items-center justify-end"
          onClick={() => hidePhotoLibrary(false)}
        >
          <IoClose className="h-10 w-10" />
        </div>
        <div className=" grid grid-cols-3 justify-center items-center gap-16 p-20 w-full">
          {images.map((image, index) => (
            <div className="" onClick={() => setImageToUser(image)}>
              <div className="h-24 w-24 cursor-pointer">
                <Image src={image} alt="avatar" width={100} height={100} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoLibrary;
