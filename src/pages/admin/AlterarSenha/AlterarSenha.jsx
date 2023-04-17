import React, { useEffect, useState } from "react";
import axios from "axios";
import { ContainerFormulario } from "../../../components/Formulario/Formulario";
import { Input } from "../../../components/Input/Input";
import { Botao } from "../../../components/Botao/Botao";

export const AlterarSenha = () => {
  const [userName, setUserName] = useState("");
  const [senha, setSenha] = useState("");
  const [userList, setUserList] = useState([]);

  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  function gerarCredencialBase64(username, password) {
    var token = username + ":" + password;
    var hash = btoa(token); // codifica a string em Base64
    return "Basic " + hash; // adiciona o prefixo "Basic" e retorna a credencial
  }
  const credencial = gerarCredencialBase64(usuario, password);

  //PUT - ATUALIZAR
  const putSenha = async () => {
    try {
      let data = JSON.stringify({
        password: senha,
      });

      const config = {
        mode: "no-cors",
        method: "put",
        maxBodyLength: Infinity,
        url: `http://34.16.131.174/api/v1/usuario/senha/username/${userName}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response);
      window.alert("Senha alterada com sucesso!");
      window.history.back();
      
    } catch (error) {
      console.log(error);
    }
  };

  // GET - user
  const getUsuarios = async () => {
    try {
      const config = {
        mode: "no-cors",
        method: "get",
        url: "http://34.16.131.174/api/v1/usuario",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic YWRtaW46c2VuaGExMjM=",
        },
        params: {
          page: 0,
          size: "*",
          sort: "nome,asc",
        },
      };

      const response = await axios.request(config);
      console.log("RESPONSE:", response);
      return response.data.content;
    } catch (error) {
      console.log("ERROR ", error);
      console.log("MENSAGEM DE ERRO: ", error.response.config.params);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsuarios();
      console.log("data", data);
      const usuariosAtivos = data.filter((usuario) => {
        const isAtivo = usuario.status === "ativo";
        return isAtivo;
      });
      setUserList(usuariosAtivos);
    };
    fetchData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await putSenha();
    } catch (error) {
      console.log(error);
    }
  }

  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectChange = (event) => {
    const idSelecionado = parseInt(event.target.value);
    const user = userList.find((item) => item.id === idSelecionado);
    setSelectedUser(user);
    setUserName(user.username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ContainerFormulario titulo="Alterar senha">
        <div style={{ gridColumn: "1/3" }}>
          <label htmlFor="username">Usuário</label>
          <select
            id="username"
            vvalue={selectedUser ? selectedUser : ""}
            required
            onChange={handleSelectChange}
          >
            <option disabled value={""}>
              Selecione uma opção
            </option>

            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Nova senha"
          id="senha"
          column="3 / -1"
          placeholder="Digite uma nova senha"
          value={senha}
          required
          onChange={({ target }) => setSenha(target.value)}
        />
      </ContainerFormulario>
      <Botao name={"ENVIAR"} />
    </form>
  );
};
