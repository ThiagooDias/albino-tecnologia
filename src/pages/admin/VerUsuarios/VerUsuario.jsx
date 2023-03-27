import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import style from "./VerUsuario.module.css";
import axios from "axios";

export const VerUsuario = () => {
  const [userList, setUserList] = useState([]);

  // GET
  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  usuario = "admin";
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
        page: 0,
        size: 0,
        sort: ["nome,asc"],
      });

      const config = {
        mode: "no-cors",
        method: "get",
        maxBodyLength: Infinity,
        url: "http://34.16.131.174/api/v1/usuario",
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };

      const response = await axios.request(config);
      return response.data.content;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      const usuariosAtivos = data.filter(item => item.status === 'ATIVO') // exibi somente usuarios ativos 
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
