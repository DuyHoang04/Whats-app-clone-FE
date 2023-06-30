import useAuth from "@/hooks/useAuth";
import useChat from "@/hooks/useChat";
import React, { useEffect, useRef } from "react";
import { calculateTime } from "@/utils/calc_time";
import MessageStatus from "./message_status";
import ImageMessage from "./image_message";

const ChatContainer: React.FC = () => {
  const { messages, currentChatUser } = useChat();
  const { userInfo } = useAuth();

  return (
    <div className="h-[80vh] w-full flex-grow relative overflow-auto">
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5 absolute left-0 top-0 bottom-0 z-0"></div>
      <div className="mx-10 my-6 relative bottom-0 z-40 left-0">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {messages.length > 0 &&
              messages?.map((message) => (
                <div className="clear-both" key={message.id}>
                  {message.type === "text" && (
                    <div
                      className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${
                        message.senderId === currentChatUser?.id
                          ? "bg-incoming-background"
                          : "bg-outgoing-background"
                      }`}
                      style={{
                        float:
                          message.senderId === currentChatUser?.id
                            ? "left"
                            : "right",
                      }}
                    >
                      <span className="break-all">{message.message}</span>
                      <div className="flex gap-1 items-end ">
                        <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                          {calculateTime(message.createdAt)}
                        </span>
                        <span>
                          {message.senderId !== currentChatUser?.id && (
                            <MessageStatus status={message.messageStatus} />
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                  {message.type === "image" && (
                    <ImageMessage message={message} />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
