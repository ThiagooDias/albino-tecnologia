import React from 'react'
import style from './Clientes.module.css'
import { BotaoContainer } from "../../../components/ContainerBotoes/BotaoContainer";
import { ClienteIcon } from "../../../assests/icons/ClienteIcon";

export const Clientes = () => {
  return (
    <div className={style.container}>
        <BotaoContainer
          name={"Cadastrar cliente"}
          path={"/financeiro/clientes/cadastrar-cliente"}
        >
          <ClienteIcon width={48} fill={'#4D7BEB'}/>
        </BotaoContainer>

        <BotaoContainer name={"Ver clientes"} path={"/financeiro/clientes/lista-clientes"}>
          <ClienteIcon width={48} fill={'#4D7BEB'}/>
        </BotaoContainer>
      </div>
  )
}

