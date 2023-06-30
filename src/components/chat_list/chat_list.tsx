import React, { useEffect, useState } from "react";
import ChatListHeader from "./chat_list_header";
import List from "./list";
import SearchBar from "./search_bar";
import ContactList from "./contact_list";
import useContact from "@/hooks/useContact";

const ChatList: React.FC = () => {
  const { isContactPage } = useContact();
  const [pageType, setPageType] = useState<string>("default");

  useEffect(() => {
    if (isContactPage) {
      setPageType("all-contact");
    } else {
      setPageType("default");
    }
  }, [isContactPage]);

  return (
    <div className="bg-panel-header-background flex flex-col ma-h-screen z-20 border-r border-r-gray-500">
      {pageType == "default" && (
        <>
          <ChatListHeader />
          <SearchBar />
          <List />
        </>
      )}
      {pageType == "all-contact" && <ContactList />}
    </div>
  );
};

export default ChatList;
