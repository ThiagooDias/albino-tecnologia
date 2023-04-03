import { React, useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

export const ProjetosChart = ({ chartRef }) => {
  const [projetos, setProjetos] = useState([]);

  // GET
  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  usuario = "gpp";
  password = "senha123";

  function gerarCredencialBase64(username, password) {
    var token = username + ":" + password;
    var hash = btoa(token); // codifica a string em Base64
    return "Basic " + hash; // adiciona o prefixo "Basic" e retorna a credencial
  }
  const credencial = gerarCredencialBase64(usuario, password);

  const getPosts = async () => {
    try {
      const config = {
        mode: "no-cors",
        method: "get",
        maxBodyLength: Infinity,
        url: "http://34.16.131.174/api/v1/projeto",
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
      setProjetos(data);
    };
    fetchData();
  }, []);

  console.log(projetos);
  // Definindo as variáveis de contagem
  let ativoCount = 0;
  let inativoCount = 0;
  let execucaoCount = 0;
  let finalizadaCount = 0;

  // Utilizando o método Object.keys() para iterar sobre as chaves do objeto de projetos
  projetos.forEach(function (projeto) {
    // Verificando o status de cada projeto e incrementando as variáveis de contagem correspondentes
    if (projeto.status === "ativo") {
      ativoCount++;
    } else if (projeto.status === "em andamento") {
      execucaoCount++;
    } else if (projeto.status === "concluido") {
      finalizadaCount++;
    }
  });


  const data = {
    labels: ["Abertos", "Em Andamento", "Concluidos"],
    datasets: [
      {
        label: "Projetos",
        data: [ativoCount, execucaoCount, finalizadaCount],
        backgroundColor: ["#ECDC4E", "#36A2EB", "#4EEC54"],
        hoverBackgroundColor: ["#ECDC4E", "#36A2EB", "#4EEC54"],
      },
    ],
  };

  const calculateSum = () => {
    const sum = data.datasets[0].data.reduce((a, b) => a + b, 0);
    return sum;
  };

  useEffect(() => {
    const chartInstance = chartRef?.current?.chartInstance;
    if (chartInstance) {
      chartInstance.destroy();
    }
  }, [data]);

  return (
    <div style={{ position: "relative" }}>
      <Doughnut data={data} />
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        {calculateSum()}
      </div>
    </div>
  );
};
