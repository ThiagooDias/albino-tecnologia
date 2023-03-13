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
        <div style={{ gridColumn: "1 /3" }}>
          <label htmlFor="razao-social">Razão Social</label>
          <select
            id="razao-social"
            value={razaoSocial}
            disabled={!isEditing}
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
          disabled={!isEditing}
          onChange={({ target }) => setCnpj(target.value)}
        />

        <Input
          label="N° do Contrato"
          id="numerodocadastro"
          value={numeroDoCadastro}
          required
          disabled={!isEditing}
          onChange={({ target }) => setNumeroDoCadastro(target.value)}
        />

        <Input
          label="Responsável"
          id="responsavel"
          column="1 / 3"
          value={responsavel}
          required
          disabled={!isEditing}
          onChange={({ target }) => setResponsavel(target.value)}
        />

        <Input
          label="Data Inicial"
          id="telefone"
          value={telefone}
          required
          disabled={!isEditing}
          type={"date"}
          onChange={({ target }) => setTelefone(target.value)}
        />

        <Input
          label="Data Final"
          id="email"
          value={email}
          required
          disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
          disabled={!isEditing}

          onChange={({ target }) => setCidade(target.value)}
        />

        <Input
          label="Condições de Pagamento"
          id="uf"
          value={estado}
          required
          disabled={!isEditing}

          onChange={({ target }) => setEstado(target.value)}
          column="3 / -1"
        />

        <Input
          style={{ height: "100px" }}
          label="Descrição"
          id="logadouro"
          value={logadouro}
          required
          disabled={!isEditing}

          column="1 / -1"
          type={"text-area"}
          onChange={({ target }) => setLogadouro(target.value)}
        />
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
