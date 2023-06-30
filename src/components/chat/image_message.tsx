import useAuth from "@/hooks/useAuth";
import useChat from "@/hooks/useChat";
import { calculateTime } from "@/utils/calc_time";
import Image from "next/image";
import React from "react";
import MessageStatus from "./message_status";

type message = {
  id: number;
  message: string;
  messageStatus: string;
  recieverId: number;
  senderId: number;
  type: string;
  createdAt: string;
};

interface imageMessagePropsType {
  message: message;
}

const ImageMessage: React.FC<imageMessagePropsType> = ({ message }) => {
  const { currentChatUser } = useChat();
  const { userInfo } = useAuth();

  return (
    <div
      className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${
        message.senderId === currentChatUser?.id
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      }`}
      style={{
        float: message.senderId === currentChatUser?.id ? "left" : "right",
      }}
    >
      <Image
        className="break-all"
        src={message.message}
        alt=""
        height={300}
        width={300}
      />
      {/* <div className="flex gap-1 items-end absolute z-[100] right-0 ">
        <span className="text-red-900 text-[11px] pt-1 min-w-fit">
          {calculateTime(message.createdAt)}
        </span>
        <span>
          {message.senderId !== currentChatUser?.id && (
            <MessageStatus status={message.messageStatus} />
          )}
        </span>
      </div> */}
    </div>
  );
};

export default ImageMessage;
