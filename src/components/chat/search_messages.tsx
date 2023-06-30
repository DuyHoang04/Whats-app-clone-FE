import useChat from "@/hooks/useChat";
import { calculateTime } from "@/utils/calc_time";
import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const SearchMessages = () => {
  const { setMessageSearchReq, currentChatUser, messages } = useChat();
  const [searchText, setSearchText] = useState<string>("");
  const [searchedMessages, setSearchedMessages] = useState<any[]>([]);

  useEffect(() => {
    if (searchText) {
      setSearchedMessages(
        messages.filter((message) => message.message === searchText)
      );
    }
  }, [searchText]);

  console.log(searchedMessages);

  return (
    <div className="border-conversation-border border-1 w-full bg-conversation-panel-background flex flex-col z-10 max-h-screen">
      <div className="h-16 px-4 py-5 flex gap-10 items-center justify-end  bg-panel-header-background text text-primary-strong">
        <span>Search Messages</span>
        <IoClose
          className="cursor-pointer text-icon-lighter text-2xl"
          onClick={setMessageSearchReq}
        />
      </div>
      <div className="overflow-auto h-full">
        <div className="flex items-center flex-col w-full">
          <div className="flex px-5 items-center gap-3 h-14 w-full">
            <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-full flex-grow">
              <div>
                <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl" />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm focus:outline-none text-white w-full"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>
          <span className="mt-10 text-secondary">
            {!searchText && `Search for messages with ${currentChatUser!.name}`}
          </span>
        </div>
        <div className="flex justify-center h-full flex-col">
          {searchText && !searchedMessages.length && (
            <span className="text-secondary w-full flex justify-center">
              No Message Found
            </span>
          )}
          <div className="flex flex-col w-full h-full">
            {searchedMessages.map((message) => (
              <div
                key={message.id}
                className="flex cursor-pointer flex-col justify-center hover:bg-background-default-hover w-full px-5 border-b-[0.1px] border-secondary py-5"
              >
                <div className="text-sm text-secondary">
                  {calculateTime(message.createdAt)}
                </div>
                <div className="text-icon-green">{message.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMessages;
