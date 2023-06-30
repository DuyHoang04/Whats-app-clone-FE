import useChat from "@/hooks/useChat";
import Image from "next/image";
import React from "react";

const IncomingVoiceCall = () => {
  const {
    incomingVoiceCall,
    socketRef,
    setEndCallReq,
    setVoiceCallReq,
    setIncomingVoiceCallReq,
  } = useChat();

  console.log(incomingVoiceCall);

  const handleRejectCall = async () => {
    setEndCallReq();
    if (socketRef && incomingVoiceCall) {
      await socketRef.emit("reject-voice-call", {
        to: incomingVoiceCall.id,
      });
    }
  };
  const handleAcceptCall = async () => {
    if (socketRef && incomingVoiceCall) {
      setVoiceCallReq({
        ...incomingVoiceCall,
        type: "in-coming",
      });
      await socketRef.emit("accept-incoming-call", {
        id: incomingVoiceCall.id,
      });
      setIncomingVoiceCallReq(undefined);
    }
  };

  return (
    <>
      {incomingVoiceCall && (
        <div className="h-24 w-80 fixed bottom-8 mb-0 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-conversation-panel-background text-white drops-shadow-2xl border-icon-green border-2 py-14">
          <div className="">
            <Image
              src={incomingVoiceCall.profileImage}
              alt=""
              width={70}
              height={70}
              className="rounded-full"
            />
          </div>
          <div className="">
            <div className="">{incomingVoiceCall.name}</div>
            <div className="text-xs">Incoming Voice Call</div>
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

export default IncomingVoiceCall;
