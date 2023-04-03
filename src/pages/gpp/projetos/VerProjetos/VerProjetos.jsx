import { React, useEffect, useState } from "react";
import axios from "axios";
import { CardProjeto } from "../../../../components/CardProjeto/CardProjeto";
import style from "./VerProjetos.module.css";

export const VerProjetos = () => {
  const [projetos, setProjetos] = useState([]);

  // GET
  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  usuario = 'gpp'
  password = 'senha123'

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

  const openprojetoList = projetos.filter(
    (projeto) => projeto.status === "ativo"
  );
  const runningprojetoList = projetos.filter(
    (projeto) => projeto.status === "em andamento"
  );
  const finishedprojetoList = projetos.filter(
    (projeto) => projeto.status === "concluido"
  );
  return (
    <div className={style.Painel}>
      <h1 className={style.Titulo}>Painel de projetos</h1>

      {openprojetoList.length > 0 && (
        <div className={style.Container}>
          <h2 className={style.Tituloh2}>Projetos abertos</h2>
          <div className={style.ContainerCard}>
            {openprojetoList.map((projeto) => (
              <CardProjeto key={projeto.id} projeto={projeto} />
            ))}
          </div>
        </div>
      )}

      {runningprojetoList.length > 0 && (
        <div className={style.Container}>
          <h2 className={style.Tituloh2}>Projetos em andamento</h2>
          <div className={style.ContainerCard}>
            {runningprojetoList.map((projeto) => (
              <CardProjeto key={projeto.id} projeto={projeto} />
            ))}
          </div>
        </div>
      )}

      {finishedprojetoList.length > 0 && (
        <div className={style.Container}>
          <h2 className={style.Tituloh2}>Projetos finalizados</h2>
          <div className={style.ContainerCard}>
            {finishedprojetoList.map((projeto) => (
              <CardProjeto key={projeto.id} projeto={projeto} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
