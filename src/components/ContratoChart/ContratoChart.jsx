import { React, useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

export const ContratoChart = ({ chartRef }) => {
  const [contratos, setContratos] = useState([]);
  // GET
  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  usuario = "financeiro1";
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
        url: "http://34.16.131.174/api/v1/contrato",
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
      setContratos(data);
    };
    fetchData();
  }, []);

  let contratosAtivos = 0; 
  let contratosInativos = 0; 

  contratos.forEach((contrato) => {
    if (contrato.status === "ativo") {
      contratosAtivos++;
    } else {
      contratosInativos++;
    }
  });

  const data = {
    labels: ["Ativos", "Inativos"],
    datasets: [
      {
        label: "Contratos",
        data: [contratosAtivos, contratosInativos],
        backgroundColor: ["#36A2EB", "#EC4E4E"],
        hoverBackgroundColor: ["#36A2EB", "#EC4E4E"],
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
