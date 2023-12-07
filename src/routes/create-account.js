import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styles from "./Login.module.css";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
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
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
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
            <div>사용할 수 없는 아이디 또는 이메일입니다.</div>
            <div>다시 입력해주세요.</div>
          </span>
        ) : null}
        <input
          className={styles.submit}
          type="submit"
          value={isLoading ? "회원가입 중..." : "회원가입"}
        />
      </form>
      <span>
        이미 계정이 있나요? <Link to="/login">로그인 →</Link>
      </span>
    </div>
  );
}
