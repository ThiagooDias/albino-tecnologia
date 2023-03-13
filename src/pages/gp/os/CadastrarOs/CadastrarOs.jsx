import { React, useState } from "react";
// import style from './CadastrarOs.module.css'
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { Botao } from "../../../../components/Botao/Botao";

export const CadastrarOs = () => {
  const [razaoSocial, setRazaoSocial] = useState("");
  const ListRazaoSocial = [
    { id: 1, name: "Empresa 1" },
    { id: 2, name: "Empresa 2" },
    { id: 3, name: "Empresa 3" },
  ];
  const [cnpj, setCnpj] = useState("");
  const [inscricaoEstadual, setinscricaoEstadual] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ContainerFormulario titulo="Cliente">
        <Input
          label="N° OS"
          id="razao-social"
          value={razaoSocial}
          required
          onChange={({ target }) => setRazaoSocial(target.value)}
        />

        <div style={{ gridColumn: "2 /4" }}>
          <label htmlFor="razao-social">Razão Social</label>
          <select
            id="razao-social"
            value={razaoSocial}
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
          id="inscricao_estadual"
          value={inscricaoEstadual}
          required
          onChange={({ target }) => setinscricaoEstadual(target.value)}
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
          label="N° Contrato"
          id="telefone"
          value={telefone}
          required
          onChange={({ target }) => setTelefone(target.value)}
        />

        <Input
          label="Data"
          id="email"
          value={email}
          required
          type={"date"}
          onChange={({ target }) => setEmail(target.value)}
        />

        <Input
          label="Qtd. Hora"
          id="email"
          value={email}
          required
          onChange={({ target }) => setEmail(target.value)}
        />

        <Input
          label="Qtd. de Pontos de Função"
          id="email"
          value={email}
          required
          onChange={({ target }) => setEmail(target.value)}
        />

        <Input
          label="Descrição"
          id="email"
          value={email}
          required
          type={"textArea"}
          column="1/-1"
          onChange={({ target }) => setEmail(target.value)}
        />
      </ContainerFormulario>
      <Botao name={"ENVIAR"} />
    </form>
  );
};
