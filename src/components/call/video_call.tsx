import useAuth from "@/hooks/useAuth";
import useChat from "@/hooks/useChat";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
const Container = dynamic(() => import("./call_container"), { ssr: false });

const VideoCall = () => {
  const { videoCall, socketRef } = useChat();
  const { userInfo } = useAuth();

  useEffect(() => {
    if (videoCall?.type === "out-going") {
      socketRef?.emit("outgoing-video-call", {
        to: videoCall.id,
        from: {
          id: userInfo?.id,
          profileImage: userInfo?.profileImage,
          name: userInfo?.name,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall]);

  return <Container data={videoCall!} />;
};

export default VideoCall;
