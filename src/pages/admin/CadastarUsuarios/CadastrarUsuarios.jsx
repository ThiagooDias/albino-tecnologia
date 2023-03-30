import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import style from "./CadastrarUsuarios.module.css";
import { ContainerFormulario } from "../../../components/Formulario/Formulario";
import { Input } from "../../../components/Input/Input";
import { Botao } from "../../../components/Botao/Botao";
import useForm from "../../../hooks/useForm";

export const CadastrarUsuarios = () => {
  const [nome, setNome] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");

  

  // POST
  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  usuario = 'admin'
  password = 'senha123'
  function gerarCredencialBase64(username, password) {
    var token = username + ":" + password;
    var hash = btoa(token); // codifica a string em Base64
    return "Basic " + hash; // adiciona o prefixo "Basic" e retorna a credencial
  }
  const credencial = gerarCredencialBase64(usuario, password);

  const getPosts = async () => {
    try {
      let data = JSON.stringify({
        nome: nome,
        username: userName,
        password: senha,
        email: email,
        roleIds: [tipoUsuario],
      });
      
      const config = {
        mode: "no-cors",
        method: "post",
        maxBodyLength: Infinity,
        url: "http://34.16.131.174/api/v1/usuario",
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };
      
      const response = await axios.request(config);
      console.log(response);
      window.history.back();
      window.alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

      try {
        await getPosts();
      } catch (error) {
        console.log(error);
      }
    
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <ContainerFormulario titulo="Usuário">
        <Input
          label="Nome"
          id="nome"
          column="1 / 3"
          value={nome}
          required
          onChange={({ target }) => setNome(target.value)}
        />

        <Input
          label="User name"
          id="userName"
          column="3 / -1"
          value={userName}
          required
          onChange={({ target }) => setUserName(target.value)}
        />

        <Input
          label="Email"
          id="email"
          value={email}
          required
          onChange={({ target }) => setEmail(target.value)}
          column="1 / 3"
        />

        <Input
          label="Senha"
          id="senha"
          value={senha}
          required
          onChange={({ target }) => setSenha(target.value)}
        />

        <div>
          <label htmlFor="tipousuario">Tipo de Usuário</label>
          <select
            required
            className={style.select}
            id="tipousuario"
            onChange={({ target }) => setTipoUsuario(target.value)}
            value={tipoUsuario}
          >
            <option disabled value="">
              Selecione
            </option>
            <option value="1">Admin</option>
            <option value="2">Gerente de portifólio de projetos</option>
            <option value="3">Financeiro</option>
            <option value="4">Diretor</option>
            <option value="5">Gerente de projetos</option>
          </select>
        </div>
      </ContainerFormulario>
      <Botao name={"ENVIAR"} />
    </form>
  );
};
