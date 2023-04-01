import { React, useState } from "react";
import axios from "axios";
import style from "./CadastrarCliente.module.css";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { Botao } from "../../../../components/Botao/Botao";
import useForm from "../../../../hooks/useForm";
import { format } from 'date-fns';
import { useEffect } from "react";

export const CadastrarCliente = () => {
  // cliente
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [inscricaoEstadual, setinscricaoEstadual] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState(new Date())

  const dataDeNascimentoFormatada = format(dataDeNascimento, 'dd/MM/yyyy');

  const validarEmail = useForm("email");
  const validarInscricaoEstadual = useForm("inscricaoEstadual");

  // endereço
  const [CEP, setCEP] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [logadouro, setLogadouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");

  // responsavel
  const [responsavel, setResponsavel] = useState("");
  const [RG, setRG] = useState("");
  const [CPF, setCPF] = useState("");
  const [emailResponsavel, setEmailResponsavel] = useState("");
  const [telefoneResponsavel, setTelefoneResponsavel] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [cargo, setCargo] = useState("");

  // endereço
  const [CEPResponsavel, setCEPResponsavel] = useState("");
  const [cidadeResponsavel, setCidadeResponsavel] = useState("");
  const [estadoResponsavel, setEstadoResponsavel] = useState("");
  const [logadouroResponsavel, setLogadouroResponsavel] = useState("");
  const [numeroResponsavel, setNumeroResponsavel] = useState("");
  const [bairroResponsavel, setBairroResponsavel] = useState("");
  const [complementoResponsavel, setComplementoResponsavel] = useState("");

  // POST
  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");



  function gerarCredencialBase64(username, password) {
    var token = username + ":" + password;
    var hash = btoa(token); // codifica a string em Base64
    return "Basic " + hash; // adiciona o prefixo "Basic" e retorna a credencial
  }
  const credencial = gerarCredencialBase64(usuario, password);

  
  const postEmpresa = async () => {
    try {
      let data = JSON.stringify({
        cnpj: cnpj,
        razaoSocial: razaoSocial,
        tipoDeEmpresa: 0, // 0 - cliente, 1 - fornecedor
        inscricaoEstadual: inscricaoEstadual,
        numeroDeTelefone: telefone,
        email: email,
        dataDeNascimento: dataDeNascimentoFormatada,
        responsavel: {
          cpf: CPF,
          nome: responsavel,
          rg: RG,
          numTelefone: telefoneResponsavel,
          email: emailResponsavel,
          departamento: departamento,
          cargo: cargo,
          endereco: {
            logradouro: logadouroResponsavel,
            numero: numeroResponsavel,
            complemento: complementoResponsavel,
            bairro: bairroResponsavel,
            cidade: cidadeResponsavel,
            cep: CEPResponsavel,
            uf: estadoResponsavel,
          },
        },
        endereco: {
          logradouro: logadouro,
          numero: numero,
          complemento: complemento,
          bairro: bairro,
          cidade: cidade,
          cep: CEP,
          uf: estado,
        },
      });

      console.log(data)
      const config = {
        mode: "no-cors",
        method: "post",
        maxBodyLength: Infinity,
        url: "http://34.16.131.174/api/v1/empresa",
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response);
      window.history.back();
      window.alert("Cliente criado com sucesso!");
      return response
    } catch (error) {
      console.log(error);
      const campoDeMensagem = error.response.data.campoDeMensagem;
      window.alert("ERRO: " + campoDeMensagem);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const resultado = await postEmpresa();
      console.log(resultado);
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <ContainerFormulario titulo="Cliente">
        <Input
          label="Razão Social"
          id="razao-social"
          column="1 / 4"
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
          placeholder={"00000"}
          // {...validarInscricaoEstadual}
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
          placeholder={"example@example.com"}
          // {...validarEmail}
        />

        <Input
          label="Data de nascimento"
          id="dataDeNascimento"
          value={dataDeNascimento.toISOString().substr(0, 10)}
          type={'date'}
          required
          onChange={(event) => {
            const { value } = event.target;
            setDataDeNascimento(new Date(value));
          }}/>
        
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
        <Input
          label="Complemento"
          id="complemento"
          value={complemento}
          column={"1/-1"}
          required
          onChange={({ target }) => setComplemento(target.value)}
        />
      </ContainerFormulario>
      

      <ContainerFormulario titulo={"Responsável"}>
        <Input
          label="Nome"
          id="nome"
          value={responsavel}
          column={"1/3"}
          required
          onChange={({ target }) => setResponsavel(target.value)}
        />

        <Input
          label="RG"
          id="rg"
          value={RG}
          required
          onChange={({ target }) => setRG(target.value)}
        />

        <Input
          label="CPF"
          id="cpf"
          value={CPF}
          required
          onChange={({ target }) => setCPF(target.value)}
        />

        <Input
          label="Telefone"
          id="telefoneResponsavel"
          value={telefoneResponsavel}
          required
          onChange={({ target }) => setTelefoneResponsavel(target.value)}
        />

        <Input
          label="Email"
          id="emailresponsavel"
          value={emailResponsavel}
          required
          onChange={({ target }) => setEmailResponsavel(target.value)}
        />

        <Input
          label="Departamento"
          id="departametno"
          value={departamento}
          required
          onChange={({ target }) => setDepartamento(target.value)}
        />

        <Input
          label="Cargo"
          id="cargo"
          value={cargo}
          required
          onChange={({ target }) => setCargo(target.value)}
        />
      </ContainerFormulario>

      <ContainerFormulario titulo={"Endereço do responsável"}>
        <Input
          label="CEP"
          id="cep"
          value={CEPResponsavel}
          required
          onChange={({ target }) => setCEPResponsavel(target.value)}
        />

        <Input
          label="Cidade"
          id="cidade"
          value={cidadeResponsavel}
          required
          onChange={({ target }) => setCidadeResponsavel(target.value)}
          column="2 / 4"
        />

        <Input
          label="UF"
          id="uf"
          value={estadoResponsavel}
          required
          onChange={({ target }) => setEstadoResponsavel(target.value)}
        />

        <Input
          label="Logadouro"
          id="logadouro"
          value={logadouroResponsavel}
          required
          onChange={({ target }) => setLogadouroResponsavel(target.value)}
          column="1 / 3"
        />

        <Input
          label="Número"
          id="numeroResponsavel"
          value={numeroResponsavel}
          required
          onChange={({ target }) => setNumeroResponsavel(target.value)}
        />

        <Input
          label="Bairro"
          id="bairroResponsavel"
          value={bairroResponsavel}
          required
          onChange={({ target }) => setBairroResponsavel(target.value)}
        />
        <Input
          label="Complemento"
          id="complementoResponsavel"
          value={complementoResponsavel}
          column={"1/-1"}
          required
          onChange={({ target }) => setComplementoResponsavel(target.value)}
        />
      </ContainerFormulario>
      <Botao name={"ENVIAR"} />
    </form>
  );
};
