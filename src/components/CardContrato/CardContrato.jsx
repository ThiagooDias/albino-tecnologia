import React from "react";
import style from "./CardContrato.module.css";
import { NavLink } from "react-router-dom";

export const CardContrato = ({ contrato, onClick}) => {
  let bg = "";
  if (contrato.status === "Aberto") {
    bg = "#36A2EB";
  } else if (contrato.status === "Em execução") {
    bg = "#d5c854";
  }
  return (
    <NavLink to={`${contrato.id}`} >
      <div style={{background: bg}} className={style.Card} onClick={onClick}>
        <h3>{contrato.name}</h3>
        <p>{contrato.status}</p>
      </div>
    </NavLink>
  );
};
