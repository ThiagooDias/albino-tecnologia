import { React, useState, useEffect } from "react";
import axios from "axios";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { Botao } from "../../../../components/Botao/Botao";
import style from "./NovoProjeto.module.css";

export const NovoProjeto = () => {
  const [nome, setNome] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [descricao, setDescricao] = useState("");

  // POST
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

  const postEmpresa = async () => {
    try {
      let data = JSON.stringify({
        nome: nome,
        descricao: descricao,
        dataDeInicio: "20/01/2022",
        dataDeTermino: "29/03/2023",
        idDaOs: 1,
        idDoUsuario: 1,
      });

      console.log(data);
      const config = {
        mode: "no-cors",
        method: "post",
        maxBodyLength: Infinity,
        url: "http://34.16.131.174/api/v1/empresa",
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response);
      window.history.back();
      window.alert("Fornecedor cadastrado com sucesso!");
      return response;
    } catch (error) {
      console.log(error);
      const campoDeMensagem = error.response.data.campoDeMensagem;
      window.alert("ERRO: " + campoDeMensagem);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const resultado = await postEmpresa();
      console.log(resultado);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <ContainerFormulario titulo="Projeto">
        <Input
          label="Nome"
          id="nome"
          column="1 / -1"
          value={nome}
          required
          onChange={({ target }) => setNome(target.value)}
        />

        <Input
          label="Responsável"
          id="responsavel"
          column="1 / 3"
          value={responsavel}
          required
          onChange={({ target }) => setResponsavel(target.value)}
        />

        <Input
          label="Data inicial"
          id="data_inicial"
          value={dataInicial}
          type="date"
          required
          onChange={({ target }) => setDataInicial(target.value)}
        />

        <Input
          label="Data final"
          id="data_final"
          value={dataFinal}
          type="date"
          required
          onChange={({ target }) => setDataFinal(target.value)}
        />

        <div style={{ gridColumn: "1/-1" }}>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            rows={10}
            id="descricao"
            value={descricao}
            onChange={({ target }) => setDescricao(target.value)}
          />
        </div>
      </ContainerFormulario>
      <Botao name={"ENVIAR"} />
    </form>
  );
};
