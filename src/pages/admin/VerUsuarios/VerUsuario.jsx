import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import style from "./VerUsuario.module.css";
import axios from "axios";

export const VerUsuario = () => {
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

  const getUsuarios = async () => {
    try {
      const config = {
        mode: "no-cors",
        method: "get",
        url: "http://34.16.131.174/api/v1/usuario",
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        params: {
          page: 0,
          size: "*",
          sort: "nome,asc",
        },
      };
  
      const response = await axios.request(config);
      console.log("RESPONSE:",response)
      return response.data.content;
    } catch (error) {
      console.log("ERROR ", error);
      console.log("MENSAGEM DE ERRO: ", error.response.config.params);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsuarios();
      const usuariosAtivos = data.filter(item => item.status === 'ativo') // exibi somente usuarios ativos 
      setUserList(usuariosAtivos);
    };
    fetchData();
  }, []);
  


  return (
    <div>
      <div className={style.Titulo}>
        <h1 className={style.Titulo}>Lista de Usuários</h1>
      </div>
      <div className={style.ContainerList}>
        <ul className={style.Lista}>
          {userList.map((user) => (
            <li key={user.id}>
              <Link className={style.Link} to={`${user.id}`}>
                {user.username}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
