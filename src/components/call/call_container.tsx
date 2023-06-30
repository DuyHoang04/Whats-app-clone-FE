import useAuth from "@/hooks/useAuth";
import useChat from "@/hooks/useChat";
import React, { useEffect, useRef, useState } from "react";
import { callType } from "@/types/redux_slice/chatSliceType";
import Image from "next/image";
import { MdOutlineCallEnd } from "react-icons/md";
import axios from "axios";
import { GENERATE_TOKEN_USER } from "@/utils/api_routes";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZIM } from "zego-zim-web";
import { useRouter } from "next/router";

type callContainerProps = {
  data: callType;
};

const CallContainer: React.FC<callContainerProps> = ({ data }) => {
  const router = useRouter();
  const { socketRef, setEndCallReq } = useChat();
  const { userInfo } = useAuth();
  const [token, setToken] = useState(undefined);
  const [zgVar, setZgVar] = useState<any | undefined>(undefined);
  const [localStream, seLocalStream] = useState<any | undefined>(undefined);
  const [publishStream, setPublishStream] = useState<any | undefined>(
    undefined
  );

  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const callRef = useRef<any | null>(null);

  useEffect(() => {
    if (data.type === "out-going") {
      socketRef?.on("accept-call", () => {
        setCallAccepted(true);
      });
    } else {
      setTimeout(() => {
        setCallAccepted(true);
      }, 1000);
    }
  }, [data]);

  const handleEndCall = async () => {
    if (data) {
      const { id } = data;
      // zgVar?.leaveRoom();
      // await zgVar?.destroy();

      if (data.callType === "voice") {
        socketRef?.emit("end-call-voice", {
          id: data.id,
        });
      } else {
        socketRef?.emit("end-call-video", {
          id: data.id,
        });
      }
      setEndCallReq();
    }
  };

  return (
    <div className="border-conversation-border border-1 w-full bg-conversation-panel-background flex flex-col h-[100vh] items-center justify-center text-white">
      <div className="flex flex-col gap-3 items-center">
        <span className="text-5xl">{data.name}</span>
        <span className="text-lg">
          {callAccepted && data.callType !== "video"
            ? "On Going Call"
            : "Calling"}
        </span>
      </div>
      {(!callAccepted || data.callType === "audio") && (
        <div className="my-24">
          <Image
            src={data.profileImage}
            alt=""
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      )}

      <div className="my-5 relative" id="remote-video">
        <div className="absolute bottom-5 right-5" id="local-audio"></div>
      </div>
      <div className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full">
        <MdOutlineCallEnd
          className="text-3xl cursor-pointer"
          onClick={handleEndCall}
        />
      </div>
    </div>
  );
};

export default CallContainer;
