import { React, useRef } from "react";
import { BarChart } from "../Barchart/BarChart";
import { ContratoChart } from "../ContratoChart/ContratoChart";
import { ProjetosChart } from "../ProjetosChart/ProjetosChart";
import style from "./DashboardSimples.module.css";

export const DashboardSimples = () => {
  const chartRef = useRef(null);

  return (
    <div className={style.Container}>
      <div className={style.Dashboard}>
        <div className={style.BarChart}>
          <h3>Ordens de serviços</h3>
          <BarChart chartRef={chartRef} />
        </div>
        <div className={style.Doughnut}>
          <h3>Contratos</h3>
          <ContratoChart chartRef={chartRef} />
        </div>
        <div className={style.Doughnut}>
          <h3>Projetos</h3>
          <ProjetosChart chartRef={chartRef} />
        </div>
      </div>
    </div>
  );
};
