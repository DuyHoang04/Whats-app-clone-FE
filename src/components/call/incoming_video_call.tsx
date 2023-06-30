import useChat from "@/hooks/useChat";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const IncomingVideoCall = () => {
  const router = useRouter();
  const {
    incomingVideoCall,
    socketRef,
    setEndCallReq,
    setIncomingVideoCallReq,
    setVideoCallReq,
  } = useChat();

  const handleRejectCall = async () => {
    if (socketRef && incomingVideoCall) {
      await socketRef.emit("reject-video-call", {
        to: incomingVideoCall.id,
      });
      setEndCallReq();
    }
  };

  const handleAcceptCall = async () => {
    if (socketRef && incomingVideoCall) {
      setVideoCallReq({
        ...incomingVideoCall,
        type: "in-coming",
      });

      await socketRef.emit("accept-incoming-call", {
        id: incomingVideoCall.id,
        roomId: incomingVideoCall.roomId,
      });
      setIncomingVideoCallReq(undefined);
      router.push(`/room/${incomingVideoCall.roomId}`);
    }
  };

  return (
    <>
      {incomingVideoCall && (
        <div className="h-24 w-80 fixed bottom-8 mb-0 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-conversation-panel-background text-white drops-shadow-2xl border-icon-green border-2 py-14">
          <div className="">
            <Image
              src={incomingVideoCall.profileImage}
              alt=""
              width={70}
              height={70}
              className="rounded-full"
            />
          </div>
          <div className="">
            <div className="">{incomingVideoCall.name}</div>
            <div className="text-xs">Incoming Video Call</div>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-red-500 o-1 px-3 text-sm rounded-full"
                onClick={handleRejectCall}
              >
                Reject
              </button>
              <button
                className="bg-red-500 o-1 px-3 text-sm rounded-full"
                onClick={handleAcceptCall}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IncomingVideoCall;
