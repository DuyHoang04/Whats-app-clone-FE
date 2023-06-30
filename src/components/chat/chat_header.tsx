import AvatarCommon from "@/common/avatar_common";
import React from "react";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import useChat from "@/hooks/useChat";
import useContact from "@/hooks/useContact";

const ChatHeader: React.FC = () => {
  const {
    currentChatUser,
    setMessageSearchReq,
    setVideoCallReq,
    setVoiceCallReq,
  } = useChat();
  const { onlineUser } = useContact();

  const handleVoiceCall = () => {
    setVoiceCallReq({
      ...currentChatUser!,
      type: "out-going",
      callType: "voice",
      roomId: Date.now(),
    });
  };

  const handleVideoCall = () => {
    setVideoCallReq({
      ...currentChatUser!,
      type: "out-going",
      callType: "video",
      roomId: Date.now(),
    });
  };

  return (
    <>
      {currentChatUser && (
        <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10">
          <div className="flex items-center justify-center gap-6">
            <AvatarCommon type="sm" image={currentChatUser.profileImage} />
            <div className="flex flex-col">
              <span className="text-primary-strong">
                {currentChatUser.name}
              </span>
              <span className="text-secondary  text-sm">
                {onlineUser.includes(currentChatUser.id) ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          <div className="flex gap-6">
            <MdCall
              className="text-panel-header-icon cursor-pointer text-xl"
              onClick={handleVoiceCall}
            />
            <IoVideocam
              className="text-panel-header-icon cursor-pointer text-xl"
              onClick={handleVideoCall}
            />
            <BiSearchAlt2
              className="text-panel-header-icon cursor-pointer text-xl"
              onClick={setMessageSearchReq}
            />
            <BsThreeDotsVertical className="text-panel-header-icon cursor-pointer text-xl" />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
