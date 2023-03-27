import { React, useState } from "react";
import style from "./CadastrarContrato.module.css";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { Botao } from "../../../../components/Botao/Botao";

export const CadastrarContrato = () => {
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
 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  const [tipoContrato, setTipoContrato] = useState("");

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <ContainerFormulario titulo="Cliente">
        <div style={{gridColumn: '1 /3'}}>
          <label htmlFor="razao-social">Razão Social</label>
          <select
            id="razao-social"
            value={razaoSocial}
            onChange={({ target }) => setRazaoSocial(target.value)}

          >
            <option disabled value="">Selecione uma opção</option>
            {ListRazaoSocial.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="CNPJ"
          id="cnpj"
          value={cnpj}
          required
      
          onChange={({ target }) => setCnpj(target.value)}
        />

        <Input
          label="N° do Contrato"
          id="numerodocadastro"
          value={numeroDoCadastro}
          required
          
          onChange={({ target }) => setNumeroDoCadastro(target.value)}
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
          label="Data Inicial"
          id="dataInicial"
          value={dataInicial}
          required
          
          type={"date"}
          onChange={({ target }) => setDataInicial(target.value)}
        />

        <Input
          label="Data Final"
          id="dataFinal"
          value={dataFinal}
          required
          
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
            
            value={descricao}
            onChange={({ target }) => setDescricao(target.value)}
          />
          </div>
      </ContainerFormulario>
      <Botao name={"ENVIAR"} />
    </form>
  );
};
