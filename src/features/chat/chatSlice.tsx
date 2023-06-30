import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/libs/store/store";
import { Socket } from "socket.io-client";
import {
  callType,
  InitialStateType,
  Message,
  User,
  incomingCallType,
} from "@/types/redux_slice/chatSliceType";

const initialState: InitialStateType = {
  currentChatUser: undefined,
  messages: [],
  socketRef: null,
  messageSearch: false,
  voiceCall: undefined,
  videoCall: undefined,
  incomingVoiceCall: undefined,
  incomingVideoCall: undefined,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChatUser: (state, action: PayloadAction<User>) => {
      state.currentChatUser = action.payload;
    },
    getMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    setSocketRef: (state, action: PayloadAction<Socket | null>) => {
      state.socketRef = action.payload as Draft<Socket> | null;
    },
    setMessageSearch: (state) => {
      state.messageSearch = !state.messageSearch;
    },
    setVoiceCall: (state, action: PayloadAction<callType>) => {
      state.voiceCall = action.payload;
    },
    setVideoCall: (state, action: PayloadAction<callType>) => {
      state.videoCall = action.payload;
    },
    setIncomingVoiceCall: (
      state,
      action: PayloadAction<incomingCallType | undefined>
    ) => {
      state.incomingVoiceCall = action.payload;
    },
    setIncomingVideoCall: (
      state,
      action: PayloadAction<incomingCallType | undefined>
    ) => {
      state.incomingVideoCall = action.payload;
    },
    setEndCall: (state) => {
      state.voiceCall = undefined;
      state.videoCall = undefined;
      state.incomingVoiceCall = undefined;
      state.incomingVideoCall = undefined;
    },
  },
});

export const {
  setCurrentChatUser,
  getMessages,
  setSocketRef,
  setMessageSearch,
  setVoiceCall,
  setVideoCall,
  setIncomingVideoCall,
  setIncomingVoiceCall,
  setEndCall,
} = chatSlice.actions;

export const selectCurrentChatUser = (state: RootState) =>
  state.chat.currentChatUser;
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectSocketRef = (state: RootState) => state.chat.socketRef;
export const messageSearch = (state: RootState) => state.chat.messageSearch;

export default chatSlice.reducer;
