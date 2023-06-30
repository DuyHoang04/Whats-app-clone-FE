import React, { useRef } from "react";
import ChatHeader from "./chat_header";
import ChatContainer from "./chat_container";
import MessageBar from "./message_bar";

const Chat = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-conversation-border border-1 w-full bg-conversation-panel-background flex flex-col h-[100vh] z-10">
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  );
};

export default Chat;
