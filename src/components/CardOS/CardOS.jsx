import React from "react";
import style from "./CardOS.module.css";
import { NavLink } from "react-router-dom";

export const CardOS = ({ os, onClick }) => {
  let bg = "";
  if (os.status === "Aberto") {
    bg = "#31cfcf";
  } else if (os.status === "Em execução") {
    bg = "#d5c854";
  } else if (os.status === "Finalizada") {
    bg = "#43b647";
  }

  return (
    <NavLink to={`detalhes/${os.id}`}>
      <div style={{ background: bg }} className={style.Card} onClick={onClick}>
        <h3>{os.name}</h3>
        <p>{os.status}</p>
      </div>
    </NavLink>
  );
};
