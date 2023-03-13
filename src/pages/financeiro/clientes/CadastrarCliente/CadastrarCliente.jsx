import { React, useState } from "react";
import style from "./CadastrarCliente.module.css";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { Botao } from "../../../../components/Botao/Botao";

export const CadastrarCliente = () => {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [inscricaoEstadual, setinscricaoEstadual] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [CEP, setCEP] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [logadouro, setLogadouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <ContainerFormulario titulo="Cliente">
        <Input
          label="Razão Social"
          id="razao-social"
          column="1 / 3"
          value={razaoSocial}
          required
          onChange={({ target }) => setRazaoSocial(target.value)}
        />

        <Input
          label="CNPJ"
          id="cnpj"
          value={cnpj}
          required
          onChange={({ target }) => setCnpj(target.value)}
        />

        <Input
          label="Inscrição Estadual"
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
          label="Telefone"
          id="telefone"
          value={telefone}
          required
          onChange={({ target }) => setTelefone(target.value)}
        />

        <Input
          label="Email"
          id="email"
          value={email}
          required
          onChange={({ target }) => setEmail(target.value)}
        />
      </ContainerFormulario>

      <ContainerFormulario titulo="Endereço">
        <Input
          label="CEP"
          id="cep"
          value={CEP}
          required
          onChange={({ target }) => setCEP(target.value)}
        />

        <Input
          label="Cidade"
          id="cidade"
          value={cidade}
          required
          onChange={({ target }) => setCidade(target.value)}
          column="2 / 4"
        />

        <Input
          label="UF"
          id="uf"
          value={estado}
          required
          onChange={({ target }) => setEstado(target.value)}
        />

        <Input
          label="Logadouro"
          id="logadouro"
          value={logadouro}
          required
          onChange={({ target }) => setLogadouro(target.value)}
          column="1 / 3"
        />

        <Input
          label="Número"
          id="numero"
          value={numero}
          required
          onChange={({ target }) => setNumero(target.value)}
        />

        <Input
          label="Bairro"
          id="bairro"
          value={bairro}
          required
          onChange={({ target }) => setBairro(target.value)}
        />
      </ContainerFormulario>
      <Botao name={"ENVIAR"} />
    </form>
  );
};
