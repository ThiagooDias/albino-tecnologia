import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardOS } from "../../../../components/CardOS/CardOS";
import style from "./VerOs.module.css";

export const VerOs = () => {
  const [osList, setosList] = useState([]) 

  // GET
  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  function gerarCredencialBase64(username, password) {
    var token = username + ":" + password;
    var hash = btoa(token); // codifica a string em Base64
    return "Basic " + hash; // adiciona o prefixo "Basic" e retorna a credencial
  }
  const credencial = gerarCredencialBase64(usuario, password);
  console.log(credencial)

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

  console.log("OS ",osList)

  const openOSList = osList.filter((os) => os.status === "ativo");
  const runningOSList = osList.filter((os) => os.status === "em execucao");
  const finishedOSList = osList.filter((os) => os.status === "finalizada");
  return (
    <div className={style.Painel}>
      <h1 className={style.Titulo}>Painel de OS</h1>

      {openOSList.length > 0 && (
      <div className={style.Container}>
        <h2 className={style.Titulo}>Abertas</h2>
        <div className={style.ContainerCard}>
          {openOSList.map((os) => (
            <CardOS key={os.id} os={os} />
          ))}
        </div>
      </div>
      )}

      {runningOSList.length > 0 && (
      <div className={style.Container}>
        <h2 className={style.Titulo}>Em execução</h2>
        <div className={style.ContainerCard}>
          {runningOSList.map((os) => (
            <CardOS key={os.id} os={os} />
          ))}
        </div>
      </div>
      )}

      {finishedOSList.length > 0 && (
      <div className={style.Container}>
        <h2 className={style.Titulo}>Finalizada</h2>
        <div className={style.ContainerCard}>
          {finishedOSList.map((os) => (
            <CardOS key={os.id} os={os} />
          ))}
        </div>
      </div>
      )}
    </div>
  );
};
