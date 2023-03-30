import { React, useState, useEffect } from "react";
import axios from "axios";
import style from "./CadastrarContrato.module.css";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { Botao } from "../../../../components/Botao/Botao";
import { format } from "date-fns";

export const CadastrarContrato = () => {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [ListClientes, setListClientes] = useState([]);
  const [cnpj, setCnpj] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());

  const [tipoContrato, setTipoContrato] = useState("");

  const [valorUnitario, setValorUnitario] = useState(0);
  const [qtdDePontosFuncao, setQtdDePontosFuncao] = useState(0);
  const [valorTotal, setValorTotal] = useState(0)
  const [valorTotalFormatado, setValorTotalFormatado] = useState("")
  
  const [descricao, setDescricao] = useState("");
  
  const [idEmpresa, setIdEmpresa] = useState("");
  const [idResponsavel, setIdResponsavel] = useState("");

  const dataFinalFormatada = format(dataFinal, "dd/MM/yyyy");
  const dataInicialFormatada = format(dataInicial, "dd/MM/yyyy");

  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  usuario = "financeiro1";
  password = "senha123";

  function gerarCredencialBase64(username, password) {
    var token = username + ":" + password;
    var hash = btoa(token); // codifica a string em Base64
    return "Basic " + hash; // adiciona o prefixo "Basic" e retorna a credencial
  }
  const credencial = gerarCredencialBase64(usuario, password);

  // GET - EMPRESA
  const getPosts = async () => {
    try {
      let data = JSON.stringify({
        page: 1,
        size: 1,
        sort: ["nome"],
      });

      const config = {
        mode: "no-cors",
        method: "get",
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
      return response.data.content;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      const clientes = data.filter((item) => item.tipoDeEmpresa === "CLIENTE");
      setListClientes(clientes);
    };
    fetchData();
  }, []);

  // POST
  const postContrato = async () => {
    try {
      let data = JSON.stringify({
        dataInicio: dataInicialFormatada,
        dataTermino: dataFinalFormatada,
        valorUnitario: valorUnitario,
        qtdDePontosFuncao: qtdDePontosFuncao,
        descricao: [descricao],
        tipoDeContrato: [tipoContrato],
        idDaEmpresa: idEmpresa,
        idDoResponsavel: idResponsavel,
        idDoUsuario: 1, // concertar
      });
      console.log(data);
      const config = {
        mode: "no-cors",
        method: "post",
        maxBodyLength: Infinity,
        url: "http://34.16.131.174/api/v1/contrato",
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response);
      window.history.back();
      window.alert("Contrato criado com sucesso!");
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
      const resultado = await postContrato();
      console.log(resultado);
    } catch (error) {
      console.log(error);
    }
  }

  // seta valores a partir do select
  const handleSelectChange = (event) => {
    const idSelecionado = parseInt(event.target.value);
    const empresa = ListClientes.find((item) => item.id === idSelecionado);
    setRazaoSocial(empresa.razaoSocial);
    setCnpj(empresa.cnpj);
    setResponsavel(empresa.responsavel.nome);
    setIdEmpresa(idSelecionado);
    setIdResponsavel(empresa.responsavel.id);
  };

  function handleValorUnitarioChange(event) {
    const novoValor1 = parseFloat(event.target.value);
    if (!isNaN(novoValor1)) {
      setValorUnitario(novoValor1);
      const novoValorTotal = novoValor1 * qtdDePontosFuncao;
      setValorTotal(novoValorTotal);
      setValorTotalFormatado(novoValorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
    } else {
      setValorUnitario(0);
      setValorTotal(0);
      setValorTotalFormatado("");
    }
  }
  
  function handleQtdDeFuncaoChange(event) {
    const novoValor2 = parseFloat(event.target.value);
    if (!isNaN(novoValor2)) {
      setQtdDePontosFuncao(novoValor2);
      const novoValorTotal = valorUnitario * novoValor2;
      setValorTotal(novoValorTotal);
      setValorTotalFormatado(novoValorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
    } else {
      setQtdDePontosFuncao(0);
      setValorTotal(0);
      setValorTotalFormatado("");
    }
  }
  

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <ContainerFormulario titulo="Cliente">
        <div style={{ gridColumn: "1 /4" }}>
          <label htmlFor="razao-social">Razão Social</label>
          <select
            id="razao-social"
            value={razaoSocial}
            onChange={handleSelectChange}
          >
            <option disabled value="">
              Selecione uma opção
            </option>

            {ListClientes.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.razaoSocial}
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
          label="Responsável"
          id="responsavel"
          column="1 / 3"
          value={responsavel}
          disabled
          required
          onChange={({ target }) => setResponsavel(target.value)}
        />

        <Input
          label="Data Inicial"
          id="dataInicial"
          value={dataInicial.toISOString().substr(0, 10)}
          required
          type={"date"}
          onChange={({ target }) => setDataInicial(new Date(target.value))}
        />

        <Input
          label="Data Final"
          id="dataFinal"
          value={dataFinal.toISOString().substr(0, 10)}
          required
          type={"date"}
          onChange={({ target }) => setDataFinal(new Date(target.value))}
        />
      </ContainerFormulario>

      <ContainerFormulario titulo="Contrato">
        <div className={style.InputRadio}>
          <p style={{ margin: "0" }}>Tipo do Contrato </p>
          <label>
            <input
              className={style.input}
              type="radio"
              value="SERVICO"
              checked={tipoContrato === "SERVICO"}
              onChange={({ target }) => setTipoContrato(target.value)}
            />
            Serviço
          </label>
          <label>
            <input
              className={style.input}
              type="radio"
              value="PRODUTO"
              checked={tipoContrato === "PRODUTO"}
              onChange={({ target }) => setTipoContrato(target.value)}
            />
            Produto
          </label>
        </div>
        <Input
          label="Valor Unitário"
          id="valorUnitario"
          type="number"
          value={valorUnitario}
          required
          onChange={handleValorUnitarioChange}
        />

        <Input
          label="Qtd. de pontos de função"
          id="qtdDePontosFuncao"
          type="number"
          value={qtdDePontosFuncao}
          required
          onChange={handleQtdDeFuncaoChange}
        />
        <Input
          label="Valor Total do Contrato"
          id="valorTotal"
          value={valorTotalFormatado}
          // type="number"
          required
          disabled
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
