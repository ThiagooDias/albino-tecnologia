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
                <span className={style.span}>{contrato.codigoDoContrato} </span>
                <span className={style.span}>
                  {contrato.empresa.razaoSocial}
                </span>
                <span className={style.span}>
                  {new Date(
                    contrato.dataTermino[0],
                    contrato.dataTermino[1] - 1,
                    contrato.dataTermino[2]
                  ).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
