import { React, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./DetalhesContratoGp.module.css";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { Botao } from "../../../../components/Botao/Botao";

export const DetalhesContratoGp = () => {
  const [razaoSocial, setRazaoSocial] = useState("");
  const ListRazaoSocial = [
    { id: 1, name: "Empresa 1" },
    { id: 2, name: "Empresa 2" },
    { id: 3, name: "Empresa 3" },
  ];
  const [cnpj, setCnpj] = useState("");
  const [numeroDoCadastro, setNumeroDoCadastro] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoContrato, setTipoContrato] = useState("");

  const contratoList = [
    { id: 1, name: "OS 1", status: "Aberto" },
    { id: 2, name: "OS 2", status: "Em execução" },
  ];

  const { id } = useParams();
  const contrato = contratoList.find((contrato) => contrato.id.toString() === id);

  function execetuarContrato() {
    window.history.back();
    window.alert('Contrato executado com sucesso!');
    console.log("executou");
  }
  function adcionarAditivo() {
    window.history.back();
    window.alert('Aditivo adcionado com sucesso!');
    console.log("executou");
  }


  return (
    <div>
      <ContainerFormulario titulo="Cliente">
      <Input
          label="Razão social"
          id="razaoSocial"
          value={razaoSocial}
          required
          column={'1/3'}
          disabled
          onChange={({ target }) => setRazaoSocial(target.value)}
        />

        <Input
          label="CNPJ"
          id="cnpj"
          value={cnpj}
          required
          disabled
          onChange={({ target }) => setCnpj(target.value)}
        />

        <Input
          label="N° do Contrato"
          id="numerodocadastro"
          value={numeroDoCadastro}
          required
          disabled
          onChange={({ target }) => setNumeroDoCadastro(target.value)}
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
          label="Data Inicial"
          id="dataInicial"
          value={dataInicial}
          required
          disabled
          type={"date"}
          onChange={({ target }) => setDataInicial(target.value)}
        />

        <Input
          label="Data Final"
          id="dataFinal"
          value={dataFinal}
          required
          disabled
          type={"date"}
          onChange={({ target }) => setDataFinal(target.value)}
        />
      </ContainerFormulario>

      <ContainerFormulario titulo="Contrato">
        <div className={style.InputRadio}>
          <p style={{ margin: "0" }}>Tipo do Contrato </p>
          <label>
            <input
              className={style.input}
              disabled
              type="radio"
              value="service"
              checked={tipoContrato === "service"}
              onChange={({ target }) => setTipoContrato(target.value)}
            />
            Serviço
          </label>
          <label>
            <input
              className={style.input}
              disabled
              type="radio"
              value="product"
              checked={tipoContrato === "product"}
              onChange={({ target }) => setTipoContrato(target.value)}
            />
            Produto
          </label>
        </div>

        <div style={{ gridColumn: "1/-1" }}>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            rows={10}
            id="descricao"
            disabled
            value={descricao}
            onChange={({ target }) => setDescricao(target.value)}
          />
        </div>
      </ContainerFormulario>
      {contrato && contrato.status === 'Aberto' && <Botao name={"EXECUTAR"} onClick={execetuarContrato} />}
      {contrato && contrato.status === 'Em execução' && <Botao name={"ADICIONAR ADTIVO"} onClick={execetuarContrato} />}

    </div>
  );
};
