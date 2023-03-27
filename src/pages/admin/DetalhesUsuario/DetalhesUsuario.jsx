import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./DetalhesUsuario.module.css";
import { ContainerFormulario } from "../../../components/Formulario/Formulario";
import { Input } from "../../../components/Input/Input";
import { Botao } from "../../../components/Botao/Botao";

export const DetalhesUsuario = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

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

  // GET
  const getUser = async () => {
    try {
      let data = JSON.stringify({
        id: id,
      });

      const config = {
        mode: "no-cors",
        method: "get",
        maxBodyLength: Infinity,
        url: `http://34.16.131.174/api/v1/usuario/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };

      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      setUser(data);
    };
    fetchData();
  }, []);

  //PUT - ATUALIZAR
  const putUser = async () => {
    let roleIds;
    const roleName = user.roles[0].roleName;
    if (roleName === "ROLE_ADMIN") {
      roleIds = 1;
    } else if (roleName === "ROLE_FINANCEIRO") {
      roleIds = 3;
    } else if (roleName === "ROLE_DIRETOR") {
      roleIds = 4;
    } else if (roleName === "ROLE_GPP") {
      roleIds = 2;
    } else if (roleName === "ROLE_GP") {
      roleIds = 5;
    }

    try {
      let data = JSON.stringify({
        nome: nome,
        username: userName,
        password: senha,
        email: email,
        roleIds: [roleIds],
      });

      const config = {
        mode: "no-cors",
        method: "put",
        maxBodyLength: Infinity,
        url: `http://34.16.131.174/api/v1/usuario/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };

      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const deleteUser = async () => {
    try {
      let data = JSON.stringify({
        id: id,
      });

      const config = {
        mode: "no-cors",
        method: "delete",
        maxBodyLength: Infinity,
        url: `http://34.16.131.174/api/v1/usuario/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response)
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // defindo estados
  const [nome, setNome] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");

  useEffect(() => {
    setNome(user.nome);
    setUserName(user.username);
    setEmail(user.email);
    setSenha(user.password);

    if (user.roles && user.roles.length > 0) {
      const roleName = user.roles[0].roleName;
      if (roleName === "ROLE_ADMIN") {
        setTipoUsuario("Admin");
      } else if (roleName === "ROLE_FINANCEIRO") {
        setTipoUsuario("Financeiro");
      } else if (roleName === "ROLE_DIRETOR") {
        setTipoUsuario("Diretor");
      } else if (roleName === "ROLE_GPP") {
        setTipoUsuario("Gpp");
      } else if (roleName === "ROLE_GP") {
        setTipoUsuario("Gp");
      }
    }
  }, [user]);

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    putUser()
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteUser()
    window.history.back();
    window.alert("Usuário deletado com sucesso!");
  };

  const handleCancel = () => {
    // Lógica para cancelar a edição e reverter as alterações
    setNome(user.nome);
    setUserName(user.username);
    setEmail(user.email);
    setSenha(user.password);

    if (user.roles && user.roles.length > 0) {
      const roleName = user.roles[0].roleName;
      if (roleName === "ROLE_ADMIN") {
        setTipoUsuario("Admin");
      } else if (roleName === "ROLE_FINANCEIRO") {
        setTipoUsuario("Financeiro");
      } else if (roleName === "ROLE_DIRETOR") {
        setTipoUsuario("Diretor");
      } else if (roleName === "ROLE_GPP") {
        setTipoUsuario("Gpp");
      } else if (roleName === "ROLE_GP") {
        setTipoUsuario("Gp");
      }
    }
    setIsEditing(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ContainerFormulario titulo="Usuário">
          <Input
            disabled={!isEditing}
            label="Nome"
            id="nome"
            column="1 / 4"
            value={nome}
            required
            onChange={({ target }) => setNome(target.value)}
          />

          <Input
            disabled={!isEditing}
            label="User Name"
            id="username"
            value={userName}
            required
            onChange={({ target }) => setUserName(target.value)}
          />

          <Input
            disabled={!isEditing}
            label="Email"
            id="email"
            value={email}
            required
            column="1 / 3"
            onChange={({ target }) => setEmail(target.value)}
          />

          <Input
            disabled={!isEditing}
            label="Senha"
            id="senha"
            value={senha}
            required
            onChange={({ target }) => setSenha(target.value)}
          />

          <Input
            disabled
            label="Tipo"
            id="tipo"
            value={tipoUsuario}
            onChange={({ target }) => setTipoUsuario(target.value)}
          />
        </ContainerFormulario>
        <div className={style.GrupoBotes}>
          {isEditing ? (
            <>
              <button className={style.Deletar} onClick={handleDelete}>
                Deteletar
              </button>

              <button onClick={handleCancel}>
                Cancelar
              </button>

              <button onClick={handleSave}>
                Salvar
              </button>
            </>
          ) : (
            <button className={style.Editar} onClick={handleEdit}>
              Editar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
