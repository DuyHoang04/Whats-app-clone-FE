import AvatarCommon from "@/common/avatar_common";
import { RootState } from "@/libs/store/store";
import React, { useState } from "react";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import useAuth from "@/hooks/useAuth";
import useContact from "@/hooks/useContact";
import {
  ContextMenuCoordinates,
  showContextMenuType,
} from "@/types/avatar_common_type";
import ContextMenu from "@/common/context_menu";
import { useRouter } from "next/router";

const ChatListHeader: React.FC = () => {
  const router = useRouter();
  const { userInfo, logOutReq } = useAuth();
  const { setContactPageReq } = useContact();
  const [isContextMenuVisible, setIsContextMenuVisible] =
    useState<boolean>(false);
  const [contextMenuCoordinates, setIsContextMenuCoordinates] =
    useState<ContextMenuCoordinates>({
      x: 0,
      y: 0,
    });

  const showContextMenu = (e: showContextMenuType) => {
    e.preventDefault();
    setIsContextMenuCoordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  const handleAllContactPage = () => {
    setContactPageReq();
  };

  const contextMenuOptions = [
    {
      name: "Log Out",
      callback: async () => {
        router.push("/logout");
      },
    },
  ];

  return (
    <>
      {userInfo ? (
        <div className="h-16 px-4 py-3 flex justify-between items-center">
          <div className="cursor-pointer">
            {userInfo.profileImage && (
              <AvatarCommon type="sm" image={userInfo.profileImage} />
            )}
          </div>
          <div className="flex gap-6">
            <BsFillChatLeftTextFill
              className="text-panel-header-icon cursor-pointer text-xl"
              title="New Chat"
              onClick={handleAllContactPage}
            />
            <>
              <BsThreeDotsVertical
                className="text-panel-header-icon cursor-pointer text-xl"
                title="Menu"
                onClick={(e) => showContextMenu(e)}
                id="context_opener"
              />
              {isContextMenuVisible && (
                <ContextMenu
                  options={contextMenuOptions}
                  coordinates={contextMenuCoordinates}
                  contextMenu={isContextMenuVisible}
                  setContextMenu={setIsContextMenuVisible}
                />
              )}
            </>
          </div>
        </div>
      ) : (
        <h1>Error</h1>
      )}
    </>
  );
};

export default ChatListHeader;
