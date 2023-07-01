import { blobToFile } from "@/utils";
import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

type capturePhotoProps = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  hideCapturePhoto: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectFile?: React.Dispatch<React.SetStateAction<File | undefined>>;
};

const CapturePhoto: React.FC<capturePhotoProps> = ({
  setImage,
  hideCapturePhoto,
  setSelectFile,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null;
    const startCamera = async () => {
      try {
        // open camera
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream; // set src video in html
        }
      } catch (err) {
        alert(err);
      }
    };
    startCamera();
    return () => {
      stream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  const capturePhoto = (): void => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const canvas = document.createElement("canvas");
      canvas.getContext("2d")?.drawImage(videoElement, 0, 0, 300, 150);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "photo.jpg", { type: blob.type });
          setSelectFile!(file);
        }
      }, "image/jpeg");
      setImage(canvas.toDataURL("image/jpeg"));
      hideCapturePhoto(false);
    } else {
      alert("Error");
    }
  };

  return (
    <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 rounded-lg pt-2 flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full">
        <div
          className="pt-2 pe-2 cursor-pointer flex items-center justify-end"
          onClick={() => hideCapturePhoto(false)}
        >
          <IoClose className="h-10 w-10" />
        </div>
        <div className="flex justify-center">
          <video id="video" width={400} autoPlay ref={videoRef}></video>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light"
            onClick={capturePhoto}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default CapturePhoto;
