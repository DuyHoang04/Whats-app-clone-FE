import {
  getAllContact,
  setContactPage,
  setSearchContact,
  setUserContact,
  setUserOnline,
} from "@/features/contact/contactSlice";
import { RootState } from "@/libs/store/store";
import { useDispatch, useSelector } from "react-redux";

type contact = {
  id: number;
  email: string;
  name: string;
  profileImage: string;
  about?: string;
};

const useContact = () => {
  const dispatch = useDispatch();
  const contactList = useSelector(
    (state: RootState) => state.contact.contactList
  );
  const isContactPage = useSelector(
    (state: RootState) => state.contact.isContactPage
  );
  const userContact = useSelector(
    (state: RootState) => state.contact.userContact
  );
  const onlineUser = useSelector(
    (state: RootState) => state.contact.onlineUser
  );
  const contactSearch = useSelector(
    (state: RootState) => state.contact.contactSearch
  );

  const getAllContactReq = (data: contact[]) => {
    dispatch(getAllContact(data));
  };
  const setContactPageReq = () => {
    dispatch(setContactPage());
  };
  const setUserContactReq = (data: any) => {
    dispatch(setUserContact(data));
  };
  const setOnlineUserReq = (data: any) => {
    dispatch(setUserOnline(data));
  };
  const setContactSearchReq = (data: string) => {
    dispatch(setSearchContact(data));
  };

  return {
    contactList,
    userContact,
    isContactPage,
    onlineUser,
    contactSearch,
    getAllContactReq,
    setContactPageReq,
    setUserContactReq,
    setOnlineUserReq,
    setContactSearchReq,
  };
};

export default useContact;
