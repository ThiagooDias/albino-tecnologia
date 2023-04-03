import { React, useState, useEffect } from "react";
import axios from "axios";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { Botao } from "../../../../components/Botao/Botao";

export const CadastrarOs = () => {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [numeroContrato, setNumeroContrato] = useState("");
  const [horas, setHoras] = useState("");
  const [pontosDeFuncao, setPontosDeFuncao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [contratos, setContratos] = useState([]);
  const [idEmpresa, setIdEmpresa] = useState("");
  const [idContrato, setIdContrato] = useState();
  const [idResponsavel, setIdResponsavel] = useState("");

  const data = new Date();
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear().toString();
  const dataFormatada = `${dia}/${mes}/${ano}`;

  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  function gerarCredencialBase64(username, password) {
    var token = username + ":" + password;
    var hash = btoa(token); // codifica a string em Base64
    return "Basic " + hash; // adiciona o prefixo "Basic" e retorna a credencial
  }
  const credencial = gerarCredencialBase64(usuario, password);

  const getPosts = async () => {
    try {
      const config = {
        mode: "no-cors",
        method: "get",
        maxBodyLength: Infinity,
        url: "http://34.16.131.174/api/v1/contrato",
        headers: {
          Authorization: "Basic ZmluYW5jZWlybzE6c2VuaGExMjM=",
        },
      };

      const response = await axios.request(config);
      console.log("resposta ", response.data.content);
      return response.data.content;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      const contratosAtivos = data.filter((item) => item.status === "ativo");
      setContratos(contratosAtivos);
    };
    fetchData();
  }, []);

  console.log("contratos ", contratos);

  // POST
  const postOS = async () => {
    try {
      let data = JSON.stringify({
        descricao: descricao,
        qtdDeHoras: `${horas}:00:00`,
        idDoResponsavel: idResponsavel,
        idDaEmpresa: idEmpresa,
        qtdPontosDeFuncao: pontosDeFuncao,
        dataDeAbertura: dataFormatada,
      });

      console.log(data);
      const config = {
        mode: "no-cors",
        method: "post",
        maxBodyLength: Infinity,
        url: `http://34.16.131.174/api/v1/os/${idContrato}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response);
      window.history.back();
      window.alert("Ordem de serviço criada com sucesso!");
      return response;
    } catch (error) {
      console.log(error);
      const campoDeMensagem = error.response.data.campoDeMensagem;
      window.alert("ERRO: " + campoDeMensagem);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const resultado = await postOS();
      console.log(resultado);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSelectChange(event) {
    const idSelecionado = parseInt(event.target.value);
    const contrato = contratos.find((item) => item.id === idSelecionado);
    setRazaoSocial(contrato.empresa.razaoSocial);
    setCnpj(contrato.empresa.cnpj);
    setResponsavel(contrato.empresa.responsavel.nome);
    setIdResponsavel(contrato.empresa.responsavel.id);
    setIdContrato(idSelecionado);
    setIdEmpresa(contrato.empresa.id)
    setNumeroContrato(contrato.codigoDoContrato)
  }

  return (
    <form onSubmit={handleSubmit}>
      <ContainerFormulario titulo="Ordem de serviço">
        <div>
          <label htmlFor="contrato">Contrato</label>
          <select
            id="contrato"
            value={numeroContrato}
            onChange={handleSelectChange}
          >
            <option disabled value="">
              Selecione uma opção
            </option>

            {contratos.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.codigoDoContrato}
              </option>
            ))}
          </select>
        </div>

        <Input
          column="2 / 4"
          label="Razão Social"
          id="razaSocial"
          value={razaoSocial}
          disabled
          required
          // onChange={({ target }) => setNumeroContrato(target.value)}
        />

        <Input
          label="CNPJ"
          id="cnpj"
          value={cnpj}
          disabled
          required
          onChange={({ target }) => setCnpj(target.value)}
        />

        <Input
          label="Responsável"
          id="responsavel"
          column="1 / 3"
          value={responsavel}
          disabled
          required
          onChange={({ target }) => setResponsavel(target.value)}
        />

        <Input
          label="Qtd. Hora"
          id="quantidadeHoras"
          value={horas}
          required
          onChange={({ target }) => setHoras(target.value)}
        />

        <Input
          label="Pontos de Função"
          id="pontosDeFuncao"
          value={pontosDeFuncao}
          required
          onChange={({ target }) => setPontosDeFuncao(target.value)}
        />
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
