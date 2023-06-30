import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FcCamera } from "react-icons/fc";
import ContextMenu from "./context_menu";
import {
  avatarPropsType,
  ContextMenuCoordinates,
  showContextMenuType,
} from "@/types/avatar_common_type";
import PhotoPicker from "./photo_picker";
import PhotoLibrary from "./photo_library";
import CapturePhoto from "./capture_photo";

const AvatarCommon: React.FC<avatarPropsType> = ({
  type,
  image,
  setImage,
  setSelectFile,
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const [isContextMenuVisible, setIsContextMenuVisible] =
    useState<boolean>(false);
  const [contextMenuCoordinates, setIsContextMenuCoordinates] =
    useState<ContextMenuCoordinates>({
      x: 0,
      y: 0,
    });
  const [grabPhoto, setGrabPhoto] = useState<boolean>(false);
  const [showPhotoLib, setShowPhotoLib] = useState<boolean>(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState<boolean>(false);

  const showContextMenu = (e: showContextMenuType) => {
    e.preventDefault();
    setIsContextMenuCoordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data && data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);

  const contextMenuOptions = [
    {
      name: "Take Photo",
      callback: () => {
        setShowCapturePhoto(true);
      },
    },
    {
      name: "Choose From Library",
      callback: () => {
        setShowPhotoLib(true);
      },
    },
    {
      name: "Upload Photo",
      callback: () => {
        setGrabPhoto(true);
      },
    },
    {
      name: "Remove Photo",
      callback: () => {
        setImage && setImage("/default_avatar.png");
      },
    },
  ];

  const photoPickerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    const fileReader = new FileReader();
    const data = document.createElement("img");
    fileReader.onload = function (event) {
      if (event.target) {
        const reader = event.target as FileReader;
        data.src = reader.result as string;
        data.setAttribute("data-src", reader.result as string);
      }
    };
    fileReader.readAsDataURL(file);
    setSelectFile!(file);

    setTimeout(() => {
      setImage!(data.src);
    }, 100);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        {type === "sm" && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "lg" && (
          <div className="relative h-14 w-14">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "xl" && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex justify-center items-center rounded-full flex-col text-center gap-2
              ${hover ? "visible" : "hidden"} z-10
              `}
              onClick={(e) => showContextMenu(e)}
            >
              <FcCamera
                className="text-2xl"
                id="context_opener"
                onClick={(e) => showContextMenu(e)}
              />
              <span onClick={(e) => showContextMenu(e)} id="context_opener">
                Change Profile Photo
              </span>
            </div>
            <div className="h-60 w-60">
              {image && (
                <Image src={image} alt="avatar" className="rounded-full" fill />
              )}
            </div>
          </div>
        )}
        <div>
          {isContextMenuVisible && (
            <ContextMenu
              options={contextMenuOptions}
              coordinates={contextMenuCoordinates}
              contextMenu={isContextMenuVisible}
              setContextMenu={setIsContextMenuVisible}
            />
          )}

          {showCapturePhoto && setImage && (
            <CapturePhoto
              setImage={setImage}
              hideCapturePhoto={setShowCapturePhoto}
            />
          )}
          {showPhotoLib && setImage && (
            <PhotoLibrary
              setImage={setImage}
              hidePhotoLibrary={setShowPhotoLib}
            />
          )}
          {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
        </div>
      </div>
    </div>
  );
};

export default AvatarCommon;
