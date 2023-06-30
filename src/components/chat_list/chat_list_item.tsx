import AvatarCommon from "@/common/avatar_common";
import useAuth from "@/hooks/useAuth";
import useChat from "@/hooks/useChat";
import useContact from "@/hooks/useContact";
import { calculateTime } from "@/utils/calc_time";
import React from "react";
import { FaCamera } from "react-icons/fa";

type contact = {
  id: number;
  email: string;
  name: string;
  profileImage: string;
  about?: string;
  totalUnreadMessages?: number;
  createdAt?: string;
  message?: string;
  senderId?: number;
  type?: string;
};

type chatListItemPropsType = {
  data: contact;
  isContactPage: boolean;
};

const ChatListItem: React.FC<chatListItemPropsType> = ({
  data,
  isContactPage = false,
}) => {
  const { setContactPageReq } = useContact();
  const { setCurrentChatUserReq } = useChat();
  const { userInfo } = useAuth();
  const { id, email, name, profileImage, about } = data;

  const handleContactClick = () => {
    const userData = {
      id,
      email,
      name,
      profileImage,
      about,
    };
    setCurrentChatUserReq(userData);
    if (isContactPage) {
      setContactPageReq();
    }
  };

  return (
    <div
      className={`flex cursor-pointer items-center hover:bg-background-default-hover `}
      onClick={handleContactClick}
    >
      <div className="min-w-fit px-5 pt-3 pb-1">
        <AvatarCommon type="lg" image={data.profileImage} />
      </div>
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
        <div className="flex justify-between">
          <div>
            <span className="text-white">{data.name}</span>
          </div>
          {!isContactPage && (
            <div className="">
              <span
                className={`${
                  data.totalUnreadMessages! > 0 ? "text-icon-green" : ""
                }`}
              >
                {calculateTime(data.createdAt)}
              </span>
            </div>
          )}
        </div>
        <div className="flex border-b border-conversation-border pb-2 pt-1 p3-2">
          <div className="flex justify-between w-full">
            <span className="text-secondary line-clamp-1 text-sm">
              {isContactPage ? (
                <div>{data.about || "\u00A0"}</div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>{`${
                    data.senderId! === userInfo?.id ? "You: " : ""
                  }`}</span>
                  {data.type === "text" && (
                    <span
                      className={`truncate ${
                        data.totalUnreadMessages! > 0
                          ? "font-medium text-white"
                          : ""
                      }`}
                    >
                      {data.message}
                    </span>
                  )}
                  {data.type === "image" && (
                    <span className="flex gap-1 items-center">
                      <FaCamera /> Image
                    </span>
                  )}
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
