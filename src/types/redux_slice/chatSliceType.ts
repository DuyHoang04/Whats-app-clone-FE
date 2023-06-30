import { Socket } from "socket.io-client";

export type User = {
  id: number;
  email: string;
  name: string;
  profileImage: string;
  about?: string;
};

export interface Message {
  id: number;
  senderId: number;
  recieverId: number;
  message: string;
  type: string;
  messageStatus: string;
  createdAt: string;
}

export type callType = {
  id: number;
  email?: string;
  name: string;
  profileImage: string;
  about?: string;
  type: string;
  callType: string;
  roomId?: number;
};

export type incomingCallType = {
  id: number;
  name: string;
  profileImage: string;
  callType: string;
  roomId: number;
};

export type InitialStateType = {
  currentChatUser?: User;
  messages: Message[];
  socketRef: Socket | null;
  messageSearch: boolean;
  voiceCall: callType | undefined;
  videoCall: callType | undefined;
  incomingVoiceCall: incomingCallType | undefined;
  incomingVideoCall: incomingCallType | undefined;
};
