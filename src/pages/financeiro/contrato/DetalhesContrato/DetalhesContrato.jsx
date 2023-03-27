import { React, useState } from "react";
import style from "./DetalhesContrato.module.css";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { Botao } from "../../../../components/Botao/Botao";

export const DetalhesContrato = () => {
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


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };
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

  return (
    <form className={style.form} onSubmit={handleSubmit}>
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
          disabled={!isEditing}
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
            disabled={!isEditing}
            value={descricao}
            onChange={({ target }) => setDescricao(target.value)}
          />
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
  );
};
