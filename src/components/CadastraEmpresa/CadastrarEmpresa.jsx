import { React, useState, useEffect } from "react";
import axios from "axios";
import style from "./CadastrarEmpresa.module.css";
import { ContainerFormulario } from "../Formulario/Formulario";
import { Input } from "../Input/Input";
import { Botao } from "../Botao/Botao";
import { format } from 'date-fns';

export const CadastrarEmpresa = ({tipoDeEmpresa}) => {
  // cliente
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [inscricaoEstadual, setinscricaoEstadual] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState(new Date())

  const dataDeNascimentoFormatada = format(dataDeNascimento, 'dd/MM/yyyy');


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

  // endereço responsavel
  const [CEPResponsavel, setCEPResponsavel] = useState("");
  const [cidadeResponsavel, setCidadeResponsavel] = useState("");
  const [estadoResponsavel, setEstadoResponsavel] = useState("");
  const [logadouroResponsavel, setLogadouroResponsavel] = useState("");
  const [numeroResponsavel, setNumeroResponsavel] = useState("");
  const [bairroResponsavel, setBairroResponsavel] = useState("");
  const [complementoResponsavel, setComplementoResponsavel] = useState("");

  // SETAR ENDEREÇO EMPRESA
  useEffect(() => {
    async function fetchData() {
      if (CEP.length === 8) {
        const response = await fetch(
          `https://viacep.com.br/ws/${CEP}/json/`
        );
        const data = await response.json();
        setLogadouro(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setEstado(data.uf);
      }
    }

    fetchData();
  }, [CEP]);

  // SETAR ENDEREÇO RESPONSAVEL
  useEffect(() => {
    async function fetchData() {
      if (CEPResponsavel.length === 8) {
        const response = await fetch(
          `https://viacep.com.br/ws/${CEPResponsavel}/json/`
        );
        const data = await response.json();
        setLogadouroResponsavel(data.logradouro);
        setBairroResponsavel(data.bairro);
        setCidadeResponsavel(data.localidade);
        setEstadoResponsavel(data.uf);
      }
    }

    fetchData();
  }, [CEPResponsavel]);

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
        tipoDeEmpresa: tipoDeEmpresa, // 0 - cliente, 1 - fornecedor
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
          label="Razão Social*"
          id="razao-social"
          column="1 / 4"
          value={razaoSocial}
          placeholder={"Digite a Razão Social"}
          required
          onChange={({ target }) => setRazaoSocial(target.value)}
        />

        <Input
          label="CNPJ*"
          id="cnpj"
          value={cnpj}
          placeholder="XX.XXX.XXX/XXXX-XX"
          mask="99.999.999/9999-99"
          required
          onChange={({ target }) => setCnpj(target.value.replace(/[^\d]/g, ''))}
        />

        <Input
          label="Inscrição Estadual*"
          id="inscricao_estadual"
          value={inscricaoEstadual}
          required
          onChange={({ target }) => setinscricaoEstadual(target.value)}
          placeholder={"XXXXX"}
          // {...validarInscricaoEstadual}
        />

        <Input
          label="Telefone*"
          id="telefone"
          value={telefone}
          required
          placeholder={"(XX) X XXXX-XXXX"}
          mask="(99) 9 9999-9999"
          onChange={({ target }) => setTelefone(target.value.replace(/[^\d]/g, ''))}
        />

        <Input
          label="Email*"
          id="email"
          value={email}
          required
          placeholder={"exemplo@exemplo.com"}
          onChange={({ target }) => setEmail(target.value)}
          // {...validarEmail}
        />

        <Input
          label="Data de nascimento*"
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
          label="CEP*"
          id="cep"
          value={CEP}
          required
          placeholder={"XXXXX-XXX"}
          mask={"99999-999"}
          onChange={({ target }) => setCEP(target.value.replace(/[^\d]/g, ''))}
        />

        <Input
          label="Cidade*"
          id="cidade"
          value={cidade}
          required
          placeholder={"Digite a cidade"}
          onChange={({ target }) => setCidade(target.value)}
          column="2 / 4"
        />

        <Input
          label="UF*"
          id="uf"
          value={estado}
          placeholder={"UF"}
          required
          onChange={({ target }) => setEstado(target.value)}
        />

        <Input
          label="Logadouro*"
          id="logadouro"
          value={logadouro}
          placeholder={"Digite o logadouro"}
          required
          onChange={({ target }) => setLogadouro(target.value)}
          column="1 / 3"
        />

        <Input
          label="Número*"
          id="numero"
          value={numero}
          placeholder={"XX"}
          required
          onChange={({ target }) => setNumero(target.value)}
        />

        <Input
          label="Bairro*"
          id="bairro"
          value={bairro}
          placeholder={"Digite o bairro"}
          required
          onChange={({ target }) => setBairro(target.value)}
        />
        <Input
          label="Complemento*"
          id="complemento"
          value={complemento}
          placeholder={"Digite o complemento"}
          required
          column={"1/-1"}
          onChange={({ target }) => setComplemento(target.value)}
        />
      </ContainerFormulario>
      

      <ContainerFormulario titulo={"Responsável"}>
        <Input
          label="Nome*"
          id="nome"
          value={responsavel}
          placeholder={"Digite o nome do responsável"}
          column={"1/3"}
          required
          onChange={({ target }) => setResponsavel(target.value)}
        />

        <Input
          label="RG*"
          id="rg"
          value={RG}
          placeholder={"XXXXXXX"}
          required
          onChange={({ target }) => setRG(target.value)}
        />

        <Input
          label="CPF*"
          id="cpf"
          value={CPF}
          placeholder={"XXX.XXX.XXX-XX"}
          mask={"999.999.999.-99"}
          required
          onChange={({ target }) => setCPF(target.value.replace(/[^\d]/g, ''))}
        />

        <Input
          label="Telefone*"
          id="telefoneResponsavel"
          value={telefoneResponsavel}
          placeholder={"(XX) X XXXX-XXXX"}
          mask={"(99) 9 9999-9999"}
          required
          onChange={({ target }) => setTelefoneResponsavel(target.value)}
        />

        <Input
          label="Email*"
          id="emailresponsavel"
          value={emailResponsavel}
          placeholder={"exemplo@exemplo.com"}
          required
          onChange={({ target }) => setEmailResponsavel(target.value)}
        />

        <Input
          label="Departamento*"
          id="departamento"
          value={departamento}
          required
          placeholder={"Digite o departamento"}
          onChange={({ target }) => setDepartamento(target.value)}
        />

        <Input
          label="Cargo*"
          id="cargo"
          value={cargo}
          placeholder={"Digite o cargo"}
          required
          onChange={({ target }) => setCargo(target.value)}
        />
      </ContainerFormulario>

      <ContainerFormulario titulo={"Endereço do responsável"}>
        <Input
          label="CEP*"
          id="cep"
          value={CEPResponsavel}
          required
          placeholder={"XXXXX-XXX"}
          mask={"99999-999"}
          onChange={({ target }) => setCEPResponsavel(target.value.replace(/[^\d]/g, ''))}
        />

        <Input
          label="Cidade*"
          id="cidade"
          value={cidadeResponsavel}
          placeholder={"Digite a cidade"}
          required
          onChange={({ target }) => setCidadeResponsavel(target.value)}
          column="2 / 4"
        />

        <Input
          label="UF*"
          id="uf"
          placeholder={"UF"}
          value={estadoResponsavel}
          required
          onChange={({ target }) => setEstadoResponsavel(target.value)}
        />

        <Input
          label="Logadouro*"
          id="logadouro"
          value={logadouroResponsavel}
          placeholder={"Digite o logadouro"}
          required
          onChange={({ target }) => setLogadouroResponsavel(target.value)}
          column="1 / 3"
        />

        <Input
          label="Número*"
          id="numeroResponsavel"
          value={numeroResponsavel}
          placeholder={"XX"}
          required
          onChange={({ target }) => setNumeroResponsavel(target.value)}
        />

        <Input
          label="Bairro*"
          id="bairroResponsavel"
          value={bairroResponsavel}
          placeholder={"Digite o bairro"}
          required
          onChange={({ target }) => setBairroResponsavel(target.value)}
        />
        <Input
          label="Complemento*"
          id="complementoResponsavel"
          placeholder={"Digite o complemento"}
          value={complementoResponsavel}
          required
          column={"1/-1"}
          onChange={({ target }) => setComplementoResponsavel(target.value)}
        />
      </ContainerFormulario>
      <Botao name={"ENVIAR"} />
    </form>
  );
};
