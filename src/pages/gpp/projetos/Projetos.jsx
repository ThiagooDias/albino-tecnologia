import React from 'react'
import style from './Projetos.module.css'
import { ProjetoIcon } from '../../../assests/icons/ProjetoIcon'
import { BotaoContainer } from '../../../components/ContainerBotoes/BotaoContainer'

export const Projetos = () => {
  return (
    <div className={style.container}>
      <BotaoContainer
        name={"Novo projeto"}
        path={"/gpp/projetos/novo-projeto"}
      >
        <ProjetoIcon width={48} fill={"#4D7BEB"} />
      </BotaoContainer>

      <BotaoContainer
        name={"Ver projetos"}
        path={"/gpp/projetos/ver-projetos"}
      >
        <ProjetoIcon width={48} fill={"#4D7BEB"} />
      </BotaoContainer>

    </div>
  )
}
