import { auth } from "../firebase";
import styles from "./Header.module.css";

export default function Logout() {
  const logOut = () => {
    auth.signOut();
  };

  return (
    <button className={styles.logout} onClick={logOut}>
      로그아웃
    </button>
  );
}
