import React from "react";
import style from "./ContratoFinanceiro.module.css";
import { BotaoContainer } from "../../../components/ContainerBotoes/BotaoContainer";
import { ContratoIcon } from "../../../assests/icons/ContratoIcon";

export const ContratoFinanceiro = () => {
  return (
    <div className={style.container}>
      <BotaoContainer
        name={"Novo contrato"}
        path={"/financeiro/contrato/cadastrar-contrato"}
      >
        <ContratoIcon width={48} fill={"#4D7BEB"} />
      </BotaoContainer>

      <BotaoContainer
        name={"Ver contratos"}
        path={"/financeiro/contrato/lista-contratos"}
      >
        <ContratoIcon width={48} fill={"#4D7BEB"} />
      </BotaoContainer>

      <BotaoContainer
        name={"Prazos de vencimentos"}
        path={"/financeiro/contrato/prazo-vencimento"}
      >
        <ContratoIcon width={48} fill={"#4D7BEB"} />
      </BotaoContainer>
    </div>
  );
};
