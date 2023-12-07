import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError("error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.bg}>
      <h1>
        <Link to="/" className={styles.home}>
          페스티벌맵
        </Link>
      </h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        {error !== "" ? (
          <span className={styles.error}>
            <div>아이디 또는 비밀번호를 잘못 입력했습니다.</div>
            <div>입력하신 내용을 다시 확인해주세요.</div>
          </span>
        ) : null}
        <input
          className={styles.submit}
          type="submit"
          value={isLoading ? "로그인 중..." : "로그인"}
        />
      </form>
      <span>
        계정이 없나요? <Link to="/create-account">회원가입 →</Link>
      </span>
    </div>
  );
}
