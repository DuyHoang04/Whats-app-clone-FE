import { ConvertUsersGroupedBtInitialLetter } from "@/utils";
import { GET_ALL_CONTACT } from "@/utils/api_routes";
import axios from "axios";
import React, { useEffect } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatListItem from "./chat_list_item";
import useContact from "@/hooks/useContact";

const ContactList = () => {
  const { contactList, getAllContactReq, setContactPageReq } = useContact();
  const allContact = ConvertUsersGroupedBtInitialLetter(contactList);

  useEffect(() => {
    const getContacts = async () => {
      const {
        data: { data },
      } = await axios.get(GET_ALL_CONTACT);
      getAllContactReq(data);
    };
    getContacts();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() => setContactPageReq()}
          />
          <span>New Chat</span>
        </div>
      </div>
      <div className="bg-search-input-container-background h-full flex-auto  overflow-scroll">
        <div className="flex py-3 items-center gap-3 h-14">
          <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-full flex-grow mx-4">
            <div>
              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl" />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Contact"
                className="bg-transparent text-sm focus:outline-none text-white w-full"
              />
            </div>
          </div>
        </div>
        {Object.entries(allContact).map(([initialLetter, contactList]) => (
          <div key={Date.now() + initialLetter}>
            <div className="text-teal-light pl-10 py-5">{initialLetter}</div>
            {contactList.map((contact) => (
              <ChatListItem
                data={contact}
                isContactPage={true}
                key={contact.id}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
