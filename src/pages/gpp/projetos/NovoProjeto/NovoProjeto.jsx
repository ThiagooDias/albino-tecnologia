import { React, useState, useEffect } from "react";
import axios from "axios";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { Botao } from "../../../../components/Botao/Botao";
import style from "./NovoProjeto.module.css";
import { format } from "date-fns";

export const NovoProjeto = () => {
  const [numeroOs, setNumeroOs] = useState("")
  const [nome, setNome] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [descricao, setDescricao] = useState("");
  const [osList, setOsList] = useState([]) 
  const [idResponsavel, setIdResponsavel] = useState("");
  const [idOS, setIdOs] = useState("")
  
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
        url: "http://34.16.131.174/api/v1/os",
        headers: {
          Authorization: "Basic Z2VyZW50ZV9wcm9qZXRvOnNlbmhhMTIz",
        },
      };

      const response = await axios.request(config);
      console.log(response);
      return response.data.content;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      const OsEmExecucao = data.filter(item => item.status === 'em execucao')
      setOsList(OsEmExecucao);
    };
    fetchData();
  }, []);


  // POST
  const postProjeto = async () => {
    try {
      let data = JSON.stringify({
        nome: nome,
        descricao: descricao,
        dataDeInicio: format(dataInicial, "dd/MM/yyyy"),
        dataDeTermino: format(dataFinal, "dd/MM/yyyy"),
        idDaOs: idOS,
        idDoUsuario: idResponsavel,
      });

      console.log(data);
      const config = {
        mode: "no-cors",
        method: "post",
        maxBodyLength: Infinity,
        url: "http://34.16.131.174/api/v1/projeto",
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response);
      window.history.back();
      window.alert("Projeto cadastrado com sucesso!");
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
      const resultado = await postProjeto();
      console.log(resultado);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelectChange = (event) => {
    const idSelecionado = parseInt(event.target.value);
    const os = osList.find((item) => item.id === idSelecionado);
    setResponsavel(os.contrato.empresa.responsavel.nome);
    setNumeroOs(os.codigoDaOS)
    setIdOs(os.id)
    setIdResponsavel(os.contrato.empresa.responsavel.id)

  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <ContainerFormulario titulo="Projeto">
      <div >
          <label htmlFor="os">Ordem de serviço</label>
          <select
            id="os"
            value={numeroOs}
            onChange={handleSelectChange}
          >
            <option disabled value="">
              Selecione uma opção
            </option>

            {osList.map((OS) => (
              <option key={OS.id} value={OS.id}>
                {OS.codigoDaOS}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Nome"
          id="nome"
          column="2 / -1"
          value={nome}
          required
          onChange={({ target }) => setNome(target.value)}
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
          label="Data inicial"
          id="data_inicial"
          value={dataInicial.toISOString().substr(0, 10)}
          type="date"
          required
          onChange={({ target }) => setDataInicial(new Date(target.value))}
        />

        <Input
          label="Data final"
          id="data_final"
          value={dataFinal.toISOString().substr(0, 10)}
          type="date"
          required
          onChange={({ target }) => setDataFinal(new Date(target.value))}
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
