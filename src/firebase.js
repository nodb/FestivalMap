import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsntmumJC863OCp40kpvHFQy7zTxRwBiA",
  authDomain: "festivalmap-b2f12.firebaseapp.com",
  projectId: "festivalmap-b2f12",
  storageBucket: "festivalmap-b2f12.appspot.com",
  messagingSenderId: "346194770114",
  appId: "1:346194770114:web:a06858bee5608d102c235b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
