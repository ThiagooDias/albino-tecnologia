import { React, useState } from "react";
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

  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

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
