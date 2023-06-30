import useAuth from "@/hooks/useAuth";
import useChat from "@/hooks/useChat";
import { callType } from "@/types/redux_slice/chatSliceType";
import { GENERATE_TOKEN_USER } from "@/utils/api_routes";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ZIM from "zego-zim-web";

type callContainerProps = {
  data: callType;
};

const RoomMeeting: React.FC<callContainerProps> = ({ data }) => {
  const router = useRouter();
  const { userInfo } = useAuth();
  const { socketRef, setEndCallReq } = useChat();
  const [token, setToken] = useState<string>("");
  const [zgVar, setZgVar] = useState<any | undefined>(undefined);

  useEffect(() => {
    const getToken = async () => {
      try {
        const {
          data: { token: returnedToken },
        } = await axios.post(`${GENERATE_TOKEN_USER}/${userInfo!.id}`);
        setToken(returnedToken);
      } catch (err) {
        console.log(err);
      }
    };
    getToken();
  }, []);

  const myMeeting = async (element: HTMLDivElement | null) => {
    const appID = +process.env.NEXT_ZEGO_APP_ID!;
    const serverSecret = process.env.NEXT_ZEGO_APP_SERVER!;
    if (data) {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        data.roomId!.toString(),
        data.id.toString(),
        data.name
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.addPlugins({ ZIM });
      setZgVar(zp);
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showTurnOffRemoteCameraButton: true,
        showTurnOffRemoteMicrophoneButton: true,
        showRemoveUserButton: true,
        showPreJoinView: false,
        onLeaveRoom: () => {
          handleEndCall();
          router.push("/");
        },
      });
    }
  };

  const handleEndCall = async () => {
    if (data) {
      const { id } = data;

      if (data.callType === "voice") {
        socketRef?.emit("end-call-voice", {
          id,
        });
      } else {
        socketRef?.emit("end-call-video", {
          id,
        });
      }
      setEndCallReq();
    }
  };

  return (
    <>{data && <div className="h-screen w-screen" ref={myMeeting}></div>}</>
  );
};
export default RoomMeeting;
