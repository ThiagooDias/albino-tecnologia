import React from "react";
import style from "./Botao.module.css";

export const Botao = ({ name, onClick }) => {
  return (
    <div className={style.Container}>
      <button className={style.botao} onClick={onClick}>
        {name}
      </button>
    </div>
  );
};
