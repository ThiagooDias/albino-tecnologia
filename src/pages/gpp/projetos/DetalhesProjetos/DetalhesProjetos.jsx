import { React, useState } from "react";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { Botao } from "../../../../components/Botao/Botao";


export const DetalhesProjeto = () => {
  const [nome, setNome] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [descricao, setDescricao] = useState("");

  function executarProjeto() {
    window.history.back();
    window.alert('Projeto executado com sucesso!');
    console.log("executou");
  }

  return (
    <div>
      <ContainerFormulario titulo="Projeto">
        <Input
          label="Nome"
          id="nome"
          column="1 / -1"
          value={nome}
          required
          disabled
          onChange={({ target }) => setNome(target.value)}
        />

        <Input
          label="Responsável"
          id="responsavel"
          column="1 / 3"
          value={responsavel}
          required
          disabled

          onChange={({ target }) => setResponsavel(target.value)}
        />

        <Input
          label="Data inicial"
          id="data_inicial"
          value={dataInicial}
          type="date"
          required
          disabled

          onChange={({ target }) => setDataInicial(target.value)}
        />

        <Input
          label="Data final"
          id="data_final"
          value={dataFinal}
          type="date"
          disabled
          required
          onChange={({ target }) => setDataFinal(target.value)}
        />

        <div style={{ gridColumn: "1/-1" }}>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            rows={10}
            id="descricao"
            readOnly
            value={descricao}
            onChange={({ target }) => setDescricao(target.value)}
          />
        </div>
      </ContainerFormulario>
      <Botao name={"EXECUTAR"} onClick={executarProjeto}/>
    </div>
  );
};
