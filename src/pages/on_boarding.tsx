import { RootState } from "@/libs/store/store";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputCommon from "@/common/input_common";
import AvatarCommon from "@/common/avatar_common";
import { CREATE_USER_ROUTE } from "@/utils/api_routes";
import { setNewUser, setUserInfo } from "@/features/users/userSlice";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

const on_boarding: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo, isNewUser, setNewUserReq, setUserInfoReq } = useAuth();

  const [name, setName] = useState<string>("");
  const [yourAbout, setYourAbout] = useState<string>("");
  const [image, setImage] = useState("/default_avatar.png");
  const [selectFile, setSelectFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (!isNewUser && !userInfo?.email) router.push("/login");
    else if (!isNewUser && userInfo?.email) router.push("/");
  }, [isNewUser, userInfo, router]);

  const onBoardUserHandler = async () => {
    if (validateData()) {
      const email = userInfo?.email;
      try {
        if (email) {
          const formDataUser = new FormData();
          formDataUser.append("email", email);
          formDataUser.append("name", name);
          formDataUser.append("about", yourAbout);
          formDataUser.append("profileImage", selectFile || image);
          const { data } = await axios.post(CREATE_USER_ROUTE, formDataUser);
          console.log(data);

          if (data.success) {
            setNewUserReq(false);
            setUserInfo({
              id: data.data.id,
              name,
              email,
              profileImage: image,
              status: yourAbout,
            });
            router.push("/");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validateData = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  };

  return (
    <div
      className="
  bg-panel-header-background
    h-screen
    w-screen
    text-white
    flex
    flex-col
    items-center
    justify-center
  "
    >
      <div className="flex items-center justify-center gap-2">
        <Image src="/whatsapp.gif" alt="" width={300} height={300} />
        <span className="text-7xl">Whats App</span>
      </div>
      <h2 className="text-2xl">Create your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <InputCommon
            placeholder={userInfo?.name}
            state={name}
            setState={setName}
          />
          <InputCommon
            placeholder={"About"}
            state={yourAbout}
            setState={setYourAbout}
          />
          <div className="flex items-center justify-center">
            <button
              className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-xl"
              onClick={onBoardUserHandler}
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <AvatarCommon
            type="xl"
            image={image}
            setImage={setImage}
            setSelectFile={setSelectFile}
          />
        </div>
      </div>
    </div>
  );
};

export default on_boarding;
