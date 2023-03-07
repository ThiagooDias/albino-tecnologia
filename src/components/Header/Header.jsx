import style from "./Header.module.css";
import React from "react";
import { Logo } from "../../components/Logo/Logo";
import { Outlet } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <div className={style.topbar}>
        <Logo />
        <h1 className={style.textLogo}>
          Albino <br />
          Tecnologia
        </h1>
      </div>

      <Outlet />
    </div>
  );
};
