import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/libs/store/store";

type contact = {
  id: number;
  email: string;
  name: string;
  profileImage: string;
  about?: string;
};

type contactUserType = {
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

type InitialStateType = {
  contactList: contact[];
  isContactPage: boolean;
  userContact: contactUserType[];
  onlineUser: number[];
  contactSearch: any[];
};

const initialState: InitialStateType = {
  isContactPage: false,
  contactList: [],
  userContact: [],
  onlineUser: [],
  contactSearch: [],
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    getAllContact: (state, action: PayloadAction<contact[]>) => {
      state.contactList = action.payload;
    },
    setContactPage: (state) => {
      state.isContactPage = !state.isContactPage;
    },
    setUserContact: (state, action: PayloadAction<contactUserType[]>) => {
      state.userContact = action.payload;
    },
    setUserOnline: (state, action: PayloadAction<number[]>) => {
      state.onlineUser = action.payload;
    },
    setSearchContact: (state, action: PayloadAction<string>) => {
      const filteredContact = state.userContact.filter(
        (contact: contactUserType) => {
          contact.name.toLowerCase().includes(action.payload.toLowerCase());
        }
      );
    },
  },
});

export const {
  getAllContact,
  setContactPage,
  setUserContact,
  setUserOnline,
  setSearchContact,
} = contactSlice.actions;

export const contactList = (state: RootState) => state.contact.contactList;
export const isContactPage = (state: RootState) => state.contact.isContactPage;
export const userContact = (state: RootState) => state.contact.userContact;
export const onlineUser = (state: RootState) => state.contact.onlineUser;
export const contactSearch = (state: RootState) => state.contact.contactSearch;

export default contactSlice.reducer;
