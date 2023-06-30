import {
  getMessages,
  setEndCall,
  setIncomingVideoCall,
  setIncomingVoiceCall,
  setMessageSearch,
  setSocketRef,
  setVideoCall,
  setVoiceCall,
} from "./../features/chat/chatSlice";
import { setCurrentChatUser } from "@/features/chat/chatSlice";
import { RootState } from "@/libs/store/store";
import {
  User,
  callType,
  incomingCallType,
} from "@/types/redux_slice/chatSliceType";
import { useDispatch, useSelector } from "react-redux";

interface message {
  id: number;
  senderId: number;
  recieverId: number;
  message: string;
  type: string;
  messageStatus: string;
  createdAt: string;
}

const useChat = () => {
  const dispatch = useDispatch();
  const currentChatUser = useSelector(
    (state: RootState) => state.chat.currentChatUser
  );
  const messages = useSelector((state: RootState) => state.chat.messages);
  const socketRef = useSelector((state: RootState) => state.chat.socketRef);
  const messageSearch = useSelector(
    (state: RootState) => state.chat.messageSearch
  );
  const voiceCall = useSelector((state: RootState) => state.chat.voiceCall);
  const videoCall = useSelector((state: RootState) => state.chat.videoCall);
  const incomingVoiceCall = useSelector(
    (state: RootState) => state.chat.incomingVoiceCall
  );
  const incomingVideoCall = useSelector(
    (state: RootState) => state.chat.incomingVideoCall
  );

  const setCurrentChatUserReq = (data: User) => {
    dispatch(setCurrentChatUser(data));
  };
  const getMessagesReq = (data: message[]) => {
    dispatch(getMessages(data));
  };
  const setSocketReq = (data: any) => {
    dispatch(setSocketRef(data));
  };
  const setMessageSearchReq = () => {
    dispatch(setMessageSearch());
  };
  const setVoiceCallReq = (data: callType) => {
    dispatch(setVoiceCall(data));
  };
  const setVideoCallReq = (data: callType) => {
    dispatch(setVideoCall(data));
  };
  const setIncomingVoiceCallReq = (data: incomingCallType | undefined) => {
    dispatch(setIncomingVoiceCall(data));
  };
  const setIncomingVideoCallReq = (data: incomingCallType | undefined) => {
    dispatch(setIncomingVideoCall(data));
  };
  const setEndCallReq = () => {
    dispatch(setEndCall());
  };

  return {
    messages,
    currentChatUser,
    socketRef,
    messageSearch,
    voiceCall,
    videoCall,
    incomingVoiceCall,
    incomingVideoCall,
    setCurrentChatUserReq,
    getMessagesReq,
    setSocketReq,
    setMessageSearchReq,
    setVoiceCallReq,
    setVideoCallReq,
    setIncomingVoiceCallReq,
    setIncomingVideoCallReq,
    setEndCallReq,
  };
};

export default useChat;
