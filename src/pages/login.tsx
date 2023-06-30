import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import React, { useCallback, useEffect } from "react";
import { firebaseAuth } from "@/utils/firebase_config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { CHECK_USER_ROUTE } from "@/utils/api_routes";
import axios from "axios";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

function login(): JSX.Element {
  const router = useRouter();
  const { setNewUserReq, setUserInfoReq } = useAuth();

  useEffect(() => {});

  const handleLogin = useCallback(async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    }: UserCredential = await signInWithPopup(firebaseAuth, provider);

    try {
      if (email) {
        const { data }: { data: any } = await axios.post(CHECK_USER_ROUTE, {
          email,
        });

        if (!data.success) {
          setNewUserReq(true);
          setUserInfoReq({
            name: name || undefined,
            email,
            profileImage: profileImage || undefined,
            status: "",
          });
          router.push("/on_boarding");
        } else {
          const { name, email, about, profileImage } = data.data;
          setNewUserReq(false);
          setUserInfoReq({
            name,
            email,
            profileImage,
            status: about,
          });
          router.push("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="flex justify-center items-center flex-col h-screen w-full bg-panel-header-background">
      <div className="flex items-center justify-center gap-2 text-white mb-4">
        <Image src="/whatsapp.gif" alt="" height={300} width={300} />
        <span className="text-7xl">Whats App</span>
      </div>
      <button
        className="flex items-center gap-3 bg-search-input-container-background p-5 rounded-xl"
        onClick={handleLogin}
      >
        <FcGoogle className="text-5xl" />
        <span className="text-white text-3xl">Login with Google</span>
      </button>
    </div>
  );
}

export default login;
