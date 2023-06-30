import RoomMeeting from "@/components/call/room_meeting";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useChat from "@/hooks/useChat";

const index = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const { videoCall } = useChat();

  useEffect(() => {
    if (!videoCall!.roomId) {
      router.push("/");
    }
  }, [videoCall]);

  return <>{videoCall && <RoomMeeting data={videoCall} />}</>;
};

export default index;
