import { React, useState, useEffect } from "react";
import axios from "axios";
import { Lista } from "../../../components/Lista/Lista";

export const ContratoGpp = () => {
  const [userList, setUserList] = useState([]);
  // GET
  const usuario = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  // usuario = "financeiro1";
  // password = "senha123";

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
        //url: 'http://34.16.131.174/api/v1/login',
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
      const clientes = data; //.filter(item => item.tipoDeEmpresa === 'CLIENTE')
      // console.log('clientes ',clientes)
      console.log("data ", data);
      setUserList(clientes);
    };
    fetchData();
  }, []);
  return (
    <Lista
      titulo={"Lista de Contratos"}
      lista={userList}
      name={"codigoDoContrato"}
    />
  );
};
