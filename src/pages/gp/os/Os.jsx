import React from 'react'
import style from './Os.module.css'
import { BotaoContainer } from "../../../components/ContainerBotoes/BotaoContainer";
import { OsIcon } from "../../../assests/icons/OsIcon";

export const Os = () => {
  return (
    <div className={style.container}>
        <BotaoContainer
          name={"Cadastrar Os"}
          path={"/gp/os/cadastrar-os"}
        >
          <OsIcon width={48} fill={'#4D7BEB'}/>
        </BotaoContainer>

        <BotaoContainer name={"Painel de Os"} path={"/gp/os/painel"}>
          <OsIcon width={48} fill={'#4D7BEB'}/>
        </BotaoContainer>
      </div>
  )
}
