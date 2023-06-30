import useAuth from "@/hooks/useAuth";
import useContact from "@/hooks/useContact";
import { GET_CONTACT_USER_ROUTE } from "@/utils/api_routes";
import axios from "axios";
import React, { useEffect } from "react";
import ChatListItem from "./chat_list_item";
import useChat from "@/hooks/useChat";

function List() {
  const { userInfo } = useAuth();
  const { setUserContactReq, userContact, setOnlineUserReq, contactSearch } =
    useContact();
  const { socketRef } = useChat();

  useEffect(() => {
    if (socketRef) {
      socketRef.on("msg-recieve", (data) => {
        if (data.from) {
          getContactsUser(data.from);
        }
      });
    }
  }, [socketRef]);

  useEffect(() => {
    if (userInfo) {
      getContactsUser(userInfo.id);
    }
  }, [userInfo]);

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

  console.log(contactSearch);

  return (
    <div className="bg-search-input-container-background flex-auto w-full overflow-auto max-h-full">
      {userContact.length > 0 &&
        userContact.map((contact: any) => (
          <ChatListItem data={contact} isContactPage={false} />
        ))}
    </div>
  );
}

export default List;
