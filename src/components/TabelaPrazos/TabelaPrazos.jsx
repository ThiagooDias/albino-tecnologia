import React from "react";
import style from "./TabelaPrazos.module.css";
import { Link } from "react-router-dom";

export function TabelaPrazos({ titulo, ...props }) {
  const { dados } = props;

  return (
    <div>
      <div className={style.Titulo}>
        <span className={style.span}>N° Contrato</span>
        <span className={style.span}>Razão Social</span>
        <span className={style.span}>Data de vencimento</span>
      </div>
      <div className={style.ContainerList}>
        <ul className={style.Lista}>
          {dados.map((contrato) => (
            <li key={contrato.id}>
              <Link className={style.Link} to={`${contrato.id}`}>
                <span className={style.span}>{contrato.numeroContrato} </span>
                <span className={style.span}>{contrato.nomeEmpresa}</span>
                <span className={style.span}>{contrato.dataVencimento} </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
