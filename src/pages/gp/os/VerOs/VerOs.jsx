import React from "react";
import { CardOS } from "../../../../components/CardOS/CardOS";
import style from "./VerOs.module.css";

export const VerOs = () => {
  const osList = [
    { id: 1, name: "OS 1", status: "Aberto" },

    { id: 2, name: "OS 2", status: "Em execução" },
    { id: 3, name: "OS 3", status: "Finalizada" },
    { id: 4, name: "OS 4", status: "Finalizada" },
    { id: 4, name: "OS 4", status: "Finalizada" },
    { id: 4, name: "OS 4", status: "Finalizada" },
    { id: 4, name: "OS 4", status: "Finalizada" },
    { id: 4, name: "OS 4", status: "Finalizada" },
    { id: 4, name: "OS 4", status: "Finalizada" },
    { id: 4, name: "OS 4", status: "Finalizada" },
    { id: 4, name: "OS 4", status: "Finalizada" },

    // Adicione mais OSs aqui
  ];
  const openOSList = osList.filter((os) => os.status === "Aberto");
  const runningOSList = osList.filter((os) => os.status === "Em execução");
  const finishedOSList = osList.filter((os) => os.status === "Finalizada");
  return (
    <div className={style.Painel}>
      <h1 className={style.Titulo}>Painel de OS</h1>
      <h2 className={style.Titulo}>Abertas</h2>

      <div className={style.ContainerCard}>
        {openOSList.map((os) => (
          <CardOS
            path={"detalhes/:id"}
            key={os.id}
            os={os}
            onClick={() => console.log("OS Aberto clicada")}
          />
        ))}
      </div>
      <h2 className={style.Titulo}>Em execução</h2>
      <div className={style.ContainerCard}>
        {runningOSList.map((os) => (
          <CardOS
            path={"detalhes/:id"}
            key={os.id}
            os={os}
            onClick={() => console.log("OS Em execução clicada")}
          />
        ))}
      </div>
      <h2 className={style.Titulo}>Finalizada</h2>
      <div className={style.ContainerCard}>
        {finishedOSList.map((os) => (
          <CardOS
            path={"detalhes/:id"}
            key={os.id}
            os={os}
            onClick={() => console.log("OS Finalizada clicada")}
          />
        ))}
      </div>
    </div>
  );
};
