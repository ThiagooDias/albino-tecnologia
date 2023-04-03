import { React, useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart, { CategoryScale } from "chart.js/auto";
Chart.register(CategoryScale);

export const BarChart = ({ chartRef }) => {
  const [osList, setosList] = useState([]);

  // GET
  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  usuario = "gerente_projeto";
  password = "senha123";

  function gerarCredencialBase64(username, password) {
    var token = username + ":" + password;
    var hash = btoa(token); // codifica a string em Base64
    return "Basic " + hash; // adiciona o prefixo "Basic" e retorna a credencial
  }
  const credencial = gerarCredencialBase64(usuario, password);
  console.log(credencial);

  const getPosts = async () => {
    try {
      const config = {
        mode: "no-cors",
        method: "get",
        maxBodyLength: Infinity,
        url: "http://34.16.131.174/api/v1/os",
        headers: {
          Authorization: credencial,
        },
      };

      const response = await axios.request(config);
      console.log(response);
      return response.data.content;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      setosList(data);
    };
    fetchData();
  }, []);

  console.log("OS ", osList);

  let ativoCount = 0;
  let inativoCount = 0;
  let execucaoCount = 0;
  let finalizadaCount = 0;

  // Loop no array de objetos
  for (let i = 0; i < osList.length; i++) {
    // Verificando o status de cada objeto e incrementando as variáveis de contagem correspondentes
    if (osList[i].status === "ativo") {
      ativoCount++;
    } else if (osList[i].status === "inativo") {
      inativoCount++;
    } else if (osList[i].status === "em execucao") {
      execucaoCount++;
    } else if (osList[i].status === "finalizada") {
      finalizadaCount++;
    }
  }

  const data = {
    labels: [""],
    datasets: [
      {
        label: "Abertas",
        backgroundColor: "#ECDC4E",
        borderColor: "rgba(0,0,0,0)",
        data: [ativoCount],
      },
      {
        label: "Em Execução",
        backgroundColor: "#36A2EB",
        data: [execucaoCount],
      },
      {
        label: "Finalizadas",
        backgroundColor: "#4EEC54",
        data: [finalizadaCount],
      },
      {
        label: "Inativas",
        backgroundColor: "#ECA34E",
        data: [inativoCount],
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
        options={{
          title: {
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
