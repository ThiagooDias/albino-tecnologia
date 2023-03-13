import { React, useState } from "react";
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
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [logadouro, setLogadouro] = useState("");
  const [tipoContrato, setTipoContrato] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };


  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <ContainerFormulario titulo="Cliente">
        <div style={{ gridColumn: "1 /3" }}>
          <label htmlFor="razao-social">Razão Social</label>
          <select
            id="razao-social"
            value={razaoSocial}
            disabled
            onChange={({ target }) => setRazaoSocial(target.value)}
          >
            <option disabled value="">
              Selecione uma opção
            </option>
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
          id="telefone"
          value={telefone}
          required
          disabled
          type={"date"}
          onChange={({ target }) => setTelefone(target.value)}
        />

        <Input
          label="Data Final"
          id="email"
          value={email}
          required
          disabled
          type={"date"}
          onChange={({ target }) => setEmail(target.value)}
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

        <Input
          label="Valor"
          id="cidade"
          value={cidade}
          required
          disabled

          onChange={({ target }) => setCidade(target.value)}
        />

        <Input
          label="Condições de Pagamento"
          id="uf"
          value={estado}
          required
          disabled

          onChange={({ target }) => setEstado(target.value)}
          column="3 / -1"
        />

        <Input
          style={{ height: "100px" }}
          label="Descrição"
          id="logadouro"
          value={logadouro}
          required
          disabled

          column="1 / -1"
          type={"text-area"}
          onChange={({ target }) => setLogadouro(target.value)}
        />
      </ContainerFormulario>
    </form>
  );
};
