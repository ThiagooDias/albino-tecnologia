import React, { useState } from "react";

import { Login } from "../../auth";
import { Logo } from "../../components/Logo/Logo";
import style from "./Login.module.css";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    Login(userType, email, password);
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <Logo />
        <h1 className={style.textLogo}>Albino Tecnologia</h1>
      </div>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label} htmlFor="email">
          Email:{" "}
        </label>
        <input
          className={style.input}
          type="email"
          autoComplete="username"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />

        <label className={style.label} htmlFor="password">
          Senha:{" "}
        </label>
        <input
          className={style.input}
          type="password"
          autoComplete="current-password"
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className={style.button} type="submit">Entrar</button>
      </form>
    </div>
  );
};
