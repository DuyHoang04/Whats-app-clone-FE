import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import useChat from "@/hooks/useChat";
import axios from "axios";
import {
  ADD_MESSAGE_ROUTE,
  GET_MESSAGE_ROUTE,
  ADD_MESSAGE_IMAGE_ROUTE,
  GET_CONTACT_USER_ROUTE,
} from "@/utils/api_routes";
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import PhotoPicker from "@/common/photo_picker";
import useContact from "@/hooks/useContact";
// import CaptureAudio from "./capture_audio";

const MessageBar: React.FC = () => {
  const { userInfo } = useAuth();
  const { setUserContactReq, setOnlineUserReq } = useContact();
  const { currentChatUser, socketRef, getMessagesReq } = useChat();
  const [message, setMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const emojiRef = useRef<HTMLDivElement>(null);
  const [grabPhoto, setGrabPhoto] = useState<boolean>(false);
  const [showAudioRecord, setShowAudioRecord] = useState<boolean>(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (event.target.id !== "emoji-open") {
        if (emojiRef.current && !emojiRef.current.contains(event.target)) {
          setShowEmojiPicker(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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

  const handleEmojiModalOpen = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emoji: any) => {
    setMessage((prev) => (prev += emoji.emoji));
  };

  const handleGetMessage = async (currentUserId: number | undefined) => {
    const { data } = await axios.get(
      `${GET_MESSAGE_ROUTE}?from=${userInfo?.id}&to=${currentUserId}`
    );
    getMessagesReq(data.data);
  };

  //SEND MESS
  const sendMessage = async () => {
    try {
      await axios.post(`${ADD_MESSAGE_ROUTE}`, {
        from: userInfo?.id,
        to: currentChatUser?.id,
        message,
      });
      if (socketRef) {
        socketRef.emit("send-msg", {
          to: currentChatUser?.id,
          from: userInfo?.id,
          message: message,
        });
      }
      handleGetMessage(currentChatUser?.id);
      getContactsUser(userInfo!.id);

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const getContactsUser = async (id: number) => {
    if (id) {
      const {
        data: { data },
      } = await axios.get(`${GET_CONTACT_USER_ROUTE}/${id}`);

      const { users, onlineUser } = data;
      setUserContactReq(users);
      setOnlineUserReq(onlineUser);
    }
  };

  // CHANGE IMAGE WHEN CLICK IMAGE IN FILE
  const photoPickerChange = async (e: any) => {
    const file = e.target.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.post(ADD_MESSAGE_IMAGE_ROUTE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        from: userInfo?.id,
        to: currentChatUser?.id,
      },
    });
    if (data.success) {
      if (socketRef) {
        socketRef.emit("send-msg", {
          to: currentChatUser?.id,
          from: userInfo?.id,
          message: message,
        });
      }
      handleGetMessage(currentChatUser?.id);
    }
  };

  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      {!showAudioRecord && (
        <>
          <div className="flex gap-6">
            <BsEmojiSmile
              className="text-panel-header-icon cursor-pointer text-xl"
              title="Emoji"
              id="emoji-open"
              onClick={handleEmojiModalOpen}
            />
            {showEmojiPicker && (
              <div className="absolute bottom-24 left-16 z-40" ref={emojiRef}>
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme={Theme.DARK}
                />
              </div>
            )}
            <ImAttachment
              className="text-panel-header-icon cursor-pointer text-xl"
              title="Attach File"
              onClick={(e) => setGrabPhoto(true)}
            />
          </div>
          <div className="w-full rounded-lg h-10 flex items-center">
            <input
              type="text"
              placeholder="Message"
              className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex w-10 items-center justify-center">
            <button className="flex items-center justify-center">
              <MdSend
                className="text-panel-header-icon cursor-pointer text-xl"
                onClick={sendMessage}
              />
              {/* {message ? (
              ) : (
                <FaMicrophone
                  className="text-panel-header-icon cursor-pointer text-xl"
                  onClick={(e) => setShowAudioRecord(true)}
                />
              )} */}
            </button>
          </div>
        </>
      )}

      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
      {/* {showAudioRecord && <CaptureAudio hide={setShowAudioRecord} />} */}
    </div>
  );
};

export default MessageBar;
