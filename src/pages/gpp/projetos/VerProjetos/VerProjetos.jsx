import React from "react";
import { CardProjeto } from "../../../../components/CardProjeto/CardProjeto";
import style from "./VerProjetos.module.css";

export const VerProjetos = () => {
  const ProjetoList = [
    { id: 1, name: "projeto 1", status: "Aberto" },
    { id: 2, name: "projeto 2", status: "Em execução" },
    { id: 3, name: "projeto 3", status: "Finalizada" },
  ];

  const openprojetoList = ProjetoList.filter(
    (projeto) => projeto.status === "Aberto"
  );
  const runningprojetoList = ProjetoList.filter(
    (projeto) => projeto.status === "Em execução"
  );
  const finishedprojetoList = ProjetoList.filter(
    (projeto) => projeto.status === "Finalizada"
  );
  return (
    <div className={style.Painel}>
      <h1 className={style.Titulo}>Painel de projetos</h1>
      <div className={style.Container}>
        <h2 className={style.Tituloh2}>Projetos abertos</h2>
        <div className={style.ContainerCard}>
          {openprojetoList.map((projeto) => (
            <CardProjeto key={projeto.id} projeto={projeto} />
          ))}
        </div>
      </div>

      <div className={style.Container}>
        <h2 className={style.Tituloh2}>Projetos em execução</h2>
        <div className={style.ContainerCard}>
          {runningprojetoList.map((projeto) => (
            <CardProjeto key={projeto.id} projeto={projeto} />
          ))}
        </div>
      </div>

      <div className={style.Container}>
        <h2 className={style.Tituloh2}>Projetos finalizados</h2>
        <div className={style.ContainerCard}>
          {finishedprojetoList.map((projeto) => (
            <CardProjeto key={projeto.id} projeto={projeto} />
          ))}
        </div>
      </div>
    </div>
  );
};
