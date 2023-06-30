import { useDispatch, useSelector } from "react-redux";
import { logOut, setNewUser, setUserInfo } from "@/features/users/userSlice";
import { RootState } from "@/libs/store/store";

type userInfoType = {
  id: number;
  name: string;
  email: string;
  profileImage: string | undefined;
  status: string;
  createdAt?: string;
};

const useAuth = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const isNewUser = useSelector((state: RootState) => state.user.newUser);

  const setNewUserReq = (data: boolean) => {
    dispatch(setNewUser(data));
  };
  const setUserInfoReq = (data: userInfoType) => {
    dispatch(setUserInfo(data));
  };
  const logOutReq = () => {
    dispatch(logOut);
  };

  return {
    userInfo,
    isNewUser,
    setNewUserReq,
    setUserInfoReq,
    logOutReq,
  };
};

export default useAuth;
