import React from "react";
import style from "./CardProjeto.module.css";
import { NavLink } from "react-router-dom";

export const CardProjeto = ({ projeto, onClick }) => {
  let bg = "";
  if (projeto.status === "Aberto") {
    bg = "#31cfcf";
  } else if (projeto.status === "Em execução") {
    bg = "#d5c854";
  } else if (projeto.status === "Finalizada") {
    bg = "#43b647";
  }

  return (
    <div>
      <NavLink to={`${projeto.id}`}>
        <div
          style={{ background: bg }}
          className={style.Card}
          onClick={onClick}
        >
          <h3>{projeto.name}</h3>
          <p>{projeto.status}</p>
        </div>
      </NavLink>
    </div>
  );
};
