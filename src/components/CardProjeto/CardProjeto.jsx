import React from "react";
import style from "./CardProjeto.module.css";
import { NavLink } from "react-router-dom";

export const CardProjeto = ({ projeto, onClick }) => {
  let bg = "";
  if (projeto.status === "ativo") {
    bg = "#36A2EB";
  } else if (projeto.status === "em andamento") {
    bg = "#d5c854";
  } else if (projeto.status === "concluido") {
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
          <h3>{projeto.nome}</h3>
          <p>{projeto.os.codigoDaOS}</p>
        </div>
      </NavLink>
    </div>
  );
};
