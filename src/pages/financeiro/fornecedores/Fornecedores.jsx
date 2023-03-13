import React from 'react'
import style from './Fornecedores.module.css'
import { BotaoContainer } from "../../../components/ContainerBotoes/BotaoContainer";
import { FornecedorIcon } from "../../../assests/icons/FornecedorIcon";

export const Fornecedores = () => {
  return (
    <div className={style.container}>
        <BotaoContainer
          name={"Cadastrar fornecedor"}
          path={"/financeiro/fornecedores/cadastrar-fornecedor"}
        >
          <FornecedorIcon width={48} fill={'#4D7BEB'}/>
        </BotaoContainer>

        <BotaoContainer name={"Ver fornecedores"} path={"/financeiro/fornecedores/lista-fornecedores"}>
          <FornecedorIcon width={48} fill={'#4D7BEB'}/>
        </BotaoContainer>
      </div>
  )
}
