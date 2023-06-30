import React, { useEffect, useRef, useState } from "react";
import ChatList from "./chat_list/chat_list";
import Empty from "./empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/firebase_config";
import {
  BASE_URL,
  CHECK_USER_ROUTE,
  GET_MESSAGE_ROUTE,
} from "@/utils/api_routes";
import axios from "axios";
import { useRouter } from "next/router";
import { setNewUser, setUserInfo } from "@/features/users/userSlice";
import Chat from "./chat/chat";
import useAuth from "@/hooks/useAuth";
import useChat from "@/hooks/useChat";
import { Socket, io } from "socket.io-client";
import SearchMessages from "./chat/search_messages";
import VideoCall from "./call/video_call";
import VoiceCall from "./call/voice_call";
import IncomingVideoCall from "./call/incoming_video_call";
import IncomingVoiceCall from "./call/incoming_voice_call";
import useContact from "@/hooks/useContact";

type userInfoType = {
  id: number;
  name: string;
  email: string;
  profileImage: string | undefined;
  about: string;
  status: string;
  createdAt: string;
};

const Main: React.FC = () => {
  const router = useRouter();
  const { userInfo, setNewUserReq, setUserInfoReq } = useAuth();
  const {
    currentChatUser,
    getMessagesReq,
    setSocketReq,
    messageSearch,
    voiceCall,
    videoCall,
    incomingVideoCall,
    incomingVoiceCall,
    setIncomingVideoCallReq,
    setIncomingVoiceCallReq,
    setEndCallReq,
  } = useChat();
  const { setOnlineUserReq } = useContact();
  const socketRef = useRef<Socket | null>(null);
  const [redirectLogin, setRedirectLogin] = useState<boolean>(false);

  useEffect(() => {
    if (redirectLogin) router.push("/login");
  }, [redirectLogin]);

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);
    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser.email,
      });
      if (!data.success) {
        router.push("login");
      } else {
        const { id, name, email, about, profileImage }: userInfoType =
          data.data;
        setNewUserReq(false);
        setUserInfoReq({
          id,
          name,
          email,
          profileImage,
          status: about,
        });
      }
    }
  });

  useEffect(() => {
    if (userInfo) {
      socketRef.current = io(BASE_URL);
      socketRef.current.emit("add-user", userInfo.id);
      setSocketReq(socketRef.current);
    }
  }, [userInfo]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("msg-recieve", async (data) => {
        const res = await axios.get(
          `${GET_MESSAGE_ROUTE}?from=${userInfo?.id}&to=${data.to}`
        );
        getMessagesReq(res.data.data);
      });

      socketRef.current.on(
        "incoming-voice-call",
        ({ from, roomId, callType }) => {
          setIncomingVoiceCallReq({ ...from, roomId, callType });
        }
      );
      socketRef.current.on(
        "incoming-video-call",
        ({ from, roomId, callType }) => {
          setIncomingVideoCallReq({ ...from, roomId, callType });
        }
      );

      socketRef.current.on("voice-call-rejected", () => {
        setEndCallReq();
      });
      socketRef.current.on("video-call-rejected", () => {
        setEndCallReq();
      });
      socketRef.current.on("end-call", () => {
        setEndCallReq();
        router.push("/");
      });
      socketRef.current.on("accept-call", ({ roomId }) => {
        if (roomId) {
          router.push(`/room/${roomId}`);
        }
      });
      socketRef.current.on("online-user", ({ onlineUser }) => {
        setOnlineUserReq(onlineUser);
      });
    }
  }, [socketRef.current]);

  useEffect(() => {
    const getMessages = async () => {
      if (userInfo && currentChatUser) {
        console.log("VO");

        const { data } = await axios.get(
          `${GET_MESSAGE_ROUTE}?from=${userInfo.id}&to=${currentChatUser?.id}`
        );
        getMessagesReq(data.data);
      }
    };
    getMessages();
  }, [currentChatUser]);

  console.log(videoCall);

  return (
    <>
      {incomingVideoCall && <IncomingVideoCall />}
      {incomingVoiceCall && <IncomingVoiceCall />}
      {videoCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VideoCall />
        </div>
      )}
      {voiceCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VoiceCall />
        </div>
      )}
      {!videoCall && !voiceCall && (
        <div className="grid grid-cols-main h-screen w-screen max-h-screen overflow-hidden">
          <ChatList />
          {currentChatUser ? (
            <div
              className={`${
                messageSearch ? "grid grid-cols-2" : "grid-cols-2"
              } `}
            >
              <Chat />
              {messageSearch && <SearchMessages />}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      )}
    </>
  );
};

export default Main;
