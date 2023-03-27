import React from "react";
import { CardContrato } from "../../../components/CardContrato/CardContrato";
import style from "./Contrato.module.css";

export const ContratoGp = () => {
  const ContratoList = [
    { id: 1, name: "OS 1", status: "Aberto" },
    { id: 2, name: "OS 2", status: "Em execução" },
  ];

  const contratosDistribuidos = ContratoList.filter(
    (contrato) => contrato.status === "Aberto"
  );
  const contratosEmExecucao = ContratoList.filter(
    (contrato) => contrato.status === "Em execução"
  );

  return (
    <div className={style.Painel}>
      <h1 className={style.Titulo}>Painel de contratos</h1>
      <h2 className={style.Titulo}>Contratos distribuídos</h2>

      <div className={style.ContainerCard}>
        {contratosDistribuidos.map((contrato) => (
          <CardContrato className={style.contratosDistribuidos} key={contrato.id} contrato={contrato} />
        ))}
      </div>
      <h2 className={style.Titulo}>Contratos em execução</h2>
      <div className={style.ContainerCard}>
        {contratosEmExecucao.map((contrato) => (
          <CardContrato className={style.contratosEmExecucao} key={contrato.id} contrato={contrato} />
        ))}
      </div>
    </div>
  );
};
