import useAuth from "@/hooks/useAuth";
import useChat from "@/hooks/useChat";
import { firebaseAuth } from "@/utils/firebase_config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function logout() {
  const { socketRef } = useChat();
  const { userInfo, logOutReq } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const logOut = async () => {
      socketRef?.emit("signout", userInfo?.id);
      await logOutReq();
      signOut(firebaseAuth);
      router.push("/login");
    };
    logOut();
  }, []);

  return <div>logout</div>;
}

export default logout;
