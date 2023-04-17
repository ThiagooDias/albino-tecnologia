import React from "react";
import style from "./Formulario.module.css";

export const ContainerFormulario = ({ children, titulo }) => {
    return (
      <div className={style.containerForm}>
        <div className={style.header}>
          <h2 className={style.titulo}>{titulo}</h2>
          </div>
          <div className={style.inputGroup}>
            {children}
        </div>
      </div>
    );
  };
