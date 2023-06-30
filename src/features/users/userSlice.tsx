import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/libs/store/store";

type userInfoType = {
  id: number;
  name?: string;
  email: string;
  profileImage: string | undefined;
  status: string;
};

type InitialStateType = {
  userInfo: userInfoType | undefined;
  newUser: boolean;
};

const initialState: InitialStateType = {
  userInfo: undefined,
  newUser: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<userInfoType>) => {
      state.userInfo = action.payload;
    },
    setNewUser: (state, action: PayloadAction<boolean>) => {
      state.newUser = action.payload;
    },
    logOut: (state) => {
      state.newUser = false;
      state.userInfo = undefined;
    },
  },
});

export const { setUserInfo, setNewUser, logOut } = userSlice.actions;

export const userInfo = (state: RootState) => state.user.userInfo;

export default userSlice.reducer;
