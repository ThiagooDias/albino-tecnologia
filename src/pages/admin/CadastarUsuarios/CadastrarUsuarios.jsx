import React, { useState } from "react";
import style from "./CadastrarUsuarios.module.css";
import { ContainerFormulario } from "../../../components/Formulario/Formulario";
import { Input } from "../../../components/Input/Input";
import { Botao } from "../../../components/Botao/Botao";

export const CadastrarUsuarios = () => {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");

  const handleSubmit = (event) => {
      event.preventDefault()
      console.log(event)
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <ContainerFormulario titulo="Usuário">
        <Input
          label="Nome"
          id="nome"
          column="1 / 4"
          value={nome}
          required
          onChange={({ target }) => setNome(target.value)}
        />

        <Input
          label="Matrícula"
          id="matricula"
          value={matricula}
          required
          onChange={({ target }) => setMatricula(target.value)}
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
            <option value="diretor">Diretor</option>
            <option value="financeiro">Financeiro</option>
            <option value="gpp">Gerente de portifólio de projetos</option>
            <option value="gp">Gerente de projetos</option>
          </select>
        </div>
      </ContainerFormulario>
      <Botao name={"ENVIAR"} />
    </form>
  );
};
