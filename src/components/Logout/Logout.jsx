import React from "react";
import style from "./Logout.module.css";
import { NavLink } from "react-router-dom";
import { LogoutIcons } from "../../assests/icons/LogoutIcons";

export const Logout = () => {
  return (
    <div className={style.Logout}>
      <NavLink to="/" className={style.Link}>
        <LogoutIcons className={style.Icon} />
        Sair
      </NavLink>
    </div>
  );
};
