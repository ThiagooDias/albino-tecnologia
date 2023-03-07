import React, { Children } from "react";
import style from "./Formulario.module.css";

export const Formulario = ({ children, titulo, ...rest }) => {
    titulo = "Usuario";
    return (
      <form className={style.form}>
        <div className={style.header}>
          <h2 className={style.titulo}>{titulo}</h2>
          </div>
          <div className={style.inputGroup}>
            {children}
        </div>
      </form>
    );
  };
