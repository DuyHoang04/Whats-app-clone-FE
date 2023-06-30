import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChGz-6wMWDrUp4JF1FbcR9iwuWDXtakKM",
  authDomain: "whats-app-web-487fc.firebaseapp.com",
  projectId: "whats-app-web-487fc",
  storageBucket: "whats-app-web-487fc.appspot.com",
  messagingSenderId: "259873999286",
  appId: "1:259873999286:web:d461a4ea97bde4a0359917",
  measurementId: "G-EW1KEF8JKP",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
