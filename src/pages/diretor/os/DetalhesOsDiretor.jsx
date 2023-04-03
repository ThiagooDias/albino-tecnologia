import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ContainerFormulario } from "../../../components/Formulario/Formulario";
import { Input } from "../../../components/Input/Input";
import { Botao } from "../../../components/Botao/Botao";

export const DetalhesOsDiretor = () => {
  const { id } = useParams();

  const [numeroOS, setNumeroOs] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [numeroContrato, setNumeroContrato] = useState("");
  const [dataAbertura, setDataAbertura] = useState(new Date());
  const [horas, setHoras] = useState("");
  const [pontosDeFuncao, setPontosDeFuncao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");

  const execetuarOs = async () => {
    try {
      const config = {
        mode: "no-cors",
        method: "put",
        maxBodyLength: Infinity,
        url: `http://34.16.131.174/api/v1/os/execultar/${id}`,
        headers: {
          Authorization: credencial,
        },
      };

      const response = await axios.request(config);
      console.log(response);
      window.history.back();
      window.alert("Os executada com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  const finalizarOs = async () => {
    try {
      const config = {
        mode: "no-cors",
        method: "put",
        maxBodyLength: Infinity,
        url: `http://34.16.131.174/api/v1/os/baixa/${id}`,
        headers: {
          Authorization: credencial,
        },
      };

      const response = await axios.request(config);
      console.log(response);
      window.history.back();
      window.alert("Os finalizada com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  // GET
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
        url: `http://34.16.131.174/api/v1/os/${id}`,
        headers: {
          Authorization: credencial,
        },
      };

      const response = await axios.request(config);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      setNumeroOs(data?.codigoDaOS);
      setNumeroContrato(data?.contrato?.codigoDoContrato);
      setRazaoSocial(data?.contrato?.empresa?.razaoSocial);
      setResponsavel(data?.contrato?.empresa?.responsavel?.nome);
      setCnpj(data?.contrato?.empresa?.cnpj);
      setHoras(data?.qtdDeHoras);
      setPontosDeFuncao(data?.qtdPontosDeFuncao);
      setDescricao(data?.descricao);
      setStatus(data?.status);
      console.log(status);

      const dataArray = data?.dataDeAbertura;
      if (dataArray) {
        const novaData = new Date(dataArray[0], dataArray[1] - 1, dataArray[2]);
        setDataAbertura(novaData);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ContainerFormulario titulo="Ordem de Serviço">
        <Input
          label="N° OS"
          id="numeroOS"
          value={numeroOS}
          required
          disabled
          onChange={({ target }) => setNumeroOs(target.value)}
        />

        <Input
          label="Contrato"
          id="numeroContrato"
          value={numeroContrato}
          disabled
          required
          onChange={({ target }) => setNumeroContrato(target.value)}
        />

        <Input
          label="Razão Social"
          column={"3/-1"}
          id="razaoSocial"
          value={razaoSocial}
          required
          disabled
        />

        <Input
          label="Responsável"
          id="responsavel"
          column="1 / -1"
          value={responsavel}
          disabled
          required
          onChange={({ target }) => setResponsavel(target.value)}
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
          label="Data"
          id="data"
          value={dataAbertura.toISOString().substr(0, 10)}
          required
          disabled
          type={"date"}
        />

        <Input
          label="Horas"
          id="quantidadeHoras"
          value={horas}
          required
          disabled
          onChange={({ target }) => setHoras(target.value)}
        />

        <Input
          label="Pontos de Função"
          id="pontosDeFuncao"
          value={pontosDeFuncao}
          required
          disabled
          onChange={({ target }) => setPontosDeFuncao(target.value)}
        />
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
    </div>
  );
};
