import {React, useEffect, useState} from 'react'
import axios from 'axios';
import { TabelaPrazos } from '../../../../components/TabelaPrazos/TabelaPrazos'

export const PrazosVencimento = () => {
  const [contratos, setContratos] = useState([]);
  // GET
  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  usuario = "financeiro";
  password = "senha123";

  function gerarCredencialBase64(username, password) {
    var token = username + ":" + password;
    var hash = btoa(token); // codifica a string em Base64
    return "Basic " + hash; // adiciona o prefixo "Basic" e retorna a credencial
  }
  const credencial = gerarCredencialBase64(usuario, password);

  const getPosts = async () => {
    try {
      let data = JSON.stringify({
        page: 1,
        size: 1,
        sort: ["nome"],
      });

      const config = {
        mode: "no-cors",
        method: "get",
        maxBodyLength: Infinity,
        url: "http://34.16.131.174/api/v1/contrato",
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response)
      return response.data.content;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      const contrato = data //.filter(item => item.tipoDeEmpresa === 'CLIENTE') 
      // console.log('contrato ',contrato)
      console.log('data ',data)
      setContratos(contrato);
    };
    fetchData();
  }, []);
  return (
    <div>
        <h2 style={{display: 'grid',margin : '20px', justifyContent: 'center'}}>Prazos de vencimento</h2>
        <TabelaPrazos dados={contratos} />
    </div>
  )
}
