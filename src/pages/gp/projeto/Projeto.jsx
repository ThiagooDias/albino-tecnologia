import { React, useState, useEffect } from "react";
import axios from "axios";
import { Lista } from "../../../components/Lista/Lista";

export const ProjetoGp = () => {
  const [userList, setUserList] = useState([]);
  // GET
  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

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
          Authorization: "Basic Z3BwOnNlbmhhMTIz",
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
      const projetosDistribuidos = data.filter(
        (item) =>
          item?.gerenteDeProjeto?.username === usuario &&
          item.status === "em andamento"
      );
      setUserList(projetosDistribuidos);
    };
    fetchData();
  }, []);

  return <Lista titulo={"Lista de Contratos"} lista={userList} name={"nome"} />;
};
