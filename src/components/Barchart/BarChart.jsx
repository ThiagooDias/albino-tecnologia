import {React, useEffect, useRef} from "react";
import { Bar } from "react-chartjs-2";
import Chart, { CategoryScale } from 'chart.js/auto';
Chart.register(CategoryScale);


export const BarChart = ({chartRef}) => {
    const data = {
        labels: ["os"],
        datasets: [
          {
            label: "Abertas",
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,0)",
            data: [10],
          },
          {
            label: "Em Execução",
            backgroundColor: "rgba(192,75,192,1)",
            data: [20],
          },
          {
            label: "Finalizadas",
            backgroundColor: "rgba(192,192,75,1)",
            data: [30],
          },
        ],
      };
      
    
    useEffect(() => {
        const chartInstance = chartRef?.current?.chartInstance;
        if (chartInstance) {
          chartInstance.destroy();
        }
      }, [data]);
    

  return (
    <div>
      <Bar
        data={data}
        options = {
            {title: {
              display: true,
              text: "Ordens de Serviço",
              fontSize: 20,
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
          
      />
    </div>
  );
};
