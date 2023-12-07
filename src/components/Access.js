import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

export const Access = () => {
  const [userLogin, setUserLogin] = useState(false);
  const [userName, setUserName] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("로그인 상태");
        setUserName(user.displayName);
        setUserLogin(true);
      } else {
        console.log("로그아웃 상태");
        setUserLogin(false);
      }
    });
  }, [auth]);

  return { userLogin, userName };
};
