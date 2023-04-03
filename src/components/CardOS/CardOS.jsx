import React from "react";
import style from "./CardOS.module.css";
import { NavLink } from "react-router-dom";

export const CardOS = ({ os, onClick }) => {
  let bg = "";
  if (os.status === "ativo") {
    bg = "#36A2EB";
  } else if (os.status === "em execucao") {
    bg = "#d5c854";
  } else if (os.status === "finalizada") {
    bg = "#43b647";
  }

  return (
    <NavLink to={`detalhes/${os.id}`}>
      <div style={{ background: bg }} className={style.Card} onClick={onClick}>
        <h3>{os.codigoDaOS}</h3>
        <p>Contrato: {os.contrato.codigoDoContrato}</p>
      </div>
    </NavLink>
  );
};
