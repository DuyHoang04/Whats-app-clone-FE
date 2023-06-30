import useAuth from "@/hooks/useAuth";
import useChat from "@/hooks/useChat";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
const Container = dynamic(() => import("./call_container"), { ssr: false });

const VoiceCall = () => {
  const { voiceCall, socketRef } = useChat();
  const { userInfo } = useAuth();

  console.log(voiceCall);

  useEffect(() => {
    if (voiceCall?.type === "out-going") {
      socketRef?.emit("outgoing-voice-call", {
        to: voiceCall.id,
        from: {
          id: userInfo?.id,
          profileImage: userInfo?.profileImage,
          name: userInfo?.name,
        },
        callType: voiceCall.callType,
        roomId: voiceCall.roomId,
      });
    }
  }, [voiceCall]);

  return <Container data={voiceCall!} />;
};

export default VoiceCall;
