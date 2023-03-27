import {React, useState, useEffect } from "react";
import { Logo } from "../../components/Logo/Logo";
import style from "./Login.module.css";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  localStorage.setItem('username', userName);
  localStorage.setItem('password', password);

  const [userType, setUserType] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();


  const getPosts = async () => {
    try {
      let data = JSON.stringify({
        username: userName,
        password: password,
      });
  
      const config = {
        mode: 'no-cors',
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://34.16.131.174/api/v1/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }
  
      const response = await axios.request(config);
      setLoggedIn(response.data.matches)
      setUserType(response.data.role)
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (loggedIn) {
      if (userType === "ROLE_ADMIN") {
        navigate("/admin");
      } else if (userType === "ROLE_FINANCEIRO") {
        navigate("/financeiro");
      } else if (userType === "ROLE_DIRETOR") {
        navigate("/diretor");
      } else if (userType === "ROLE_GPP") {
        navigate("/gpp");
      } else if (userType === "ROLE_GP") {
        navigate("/gp");
      }
    }
  }, [loggedIn, navigate, userType]);
  
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <Logo />
        <h1 className={style.textLogo}>Albino Tecnologia</h1>
      </div>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label} htmlFor="email">
          Username:{" "}
        </label>
        <input
          className={style.input}
          autoComplete="username"
          placeholder="E-mail"
          value={userName}
          onChange={({ target }) => setUserName(target.value)}
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
          onChange={({ target }) => setPassword(target.value)}
        />
        <button className={style.button} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};
