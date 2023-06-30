import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/users/userSlice";
import contactReducer from "@/features/contact/contactSlice";
import chatReducer from "@/features/chat/chatSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    contact: contactReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
