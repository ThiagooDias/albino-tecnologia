import { React, useState } from "react";
import style from "./DetalhesUsuario.module.css";
import { ContainerFormulario } from "../../../components/Formulario/Formulario";
import { Input } from "../../../components/Input/Input";
import { Botao } from "../../../components/Botao/Botao";

export const DetalhesUsuario = () => {
  // dados do usuario
  const user = {
    id: "5555",
    nome: "joao",
    email: "example@example.com",
    senha: "qwe123",
    tipoUsuario: "financeiro",
  };

  // defindo estados
  const [nome, setNome] = useState(user.nome);
  const [matricula, setMatricula] = useState(user.id);
  const [email, setEmail] = useState(user.email);
  const [senha, setSenha] = useState(user.senha);
  const [tipoUsuario, setTipoUsuario] = useState(user.tipoUsuario);

  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Lógica para salvar os dados editados
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Lógica para cancelar a edição e reverter as alterações
    setIsEditing(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
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
            label="Matrícula"
            id="matricula"
            value={matricula}
            required
            onChange={({ target }) => setMatricula(target.value)}
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

          <div>
            <label htmlFor="tipousuario">Tipo de Usuário</label>
            <select
              required
              // className={style.Input}
              id="tipousuario"
              value={tipoUsuario}
              disabled={isEditing ? false : true}
              onChange={({ target }) => setTipoUsuario(target.value)}
            >
              <option disabled value="">
                Selecione
              </option>
              <option value="diretor">Diretor</option>
              <option value="financeiro">Financeiro</option>
              <option value="gpp">Gerente de portifólio de projetos</option>
              <option value="gp">Gerente de projetos</option>
            </select>
          </div>
        </ContainerFormulario>
        <div className={style.GrupoBotes}>
          {isEditing ? (
            <>
              <button className={style.Cancelar} onClick={handleCancel}>
                Cancelar
              </button>
              <button className={style.Salvar} onClick={handleSave}>
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
