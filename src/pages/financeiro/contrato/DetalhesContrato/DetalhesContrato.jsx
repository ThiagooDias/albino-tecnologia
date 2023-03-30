import { React, useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import style from "./DetalhesContrato.module.css";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { useParams } from "react-router-dom";

export const DetalhesContrato = () => {
  const { id } = useParams();
  const [contrato, setContrato] = useState();

  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [descricao, setDescricao] = useState("");
  const [tipoContrato, setTipoContrato] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [qtdDePontosFuncao, setQtdDePontosFuncao] = useState("");
  const [valorTotal, setValorTotal] = useState("")
  const [idEmpresa, setIdEmpresa] = useState("");
  const [idResponsavel, setIdResponsavel] = useState("");


  // CREDENCIAL
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

  // GET
  const getContrato = async () => {
    try {
      let data = JSON.stringify({
        id: id,
      });

      const config = {
        mode: "no-cors",
        method: "get",
        maxBodyLength: Infinity,
        url: `http://34.16.131.174/api/v1/contrato/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };

      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContrato();
      setContrato(data);
    };
    fetchData();
  }, []);

  console.log(contrato);

  useEffect(() => {
    setRazaoSocial(contrato?.empresa?.razaoSocial);
    setCnpj(contrato?.empresa?.cnpj);
    setResponsavel(contrato?.empresa?.responsavel?.nome);

    const dataInicialArray = contrato?.dataInicio;
    if (dataInicialArray) {
      const novaDataInicial = new Date(
        dataInicialArray[0],
        dataInicialArray[1],
        dataInicialArray[2]
      );
      setDataInicial(novaDataInicial);
    }

    const dataFinalArray = contrato?.dataTermino;
    if (dataFinalArray) {
      const novaDataFinal = new Date(
        dataFinalArray[0],
        dataFinalArray[1] - 1,
        dataFinalArray[2]
      );
      setDataFinal(novaDataFinal);
    }
    setQtdDePontosFuncao(contrato?.qtdDePontosFuncao)

    const opcoes = {
      style: 'currency',
      currency: 'BRL'
    };

    setValorUnitario(parseFloat(contrato?.valorUnitario).toLocaleString('pt-BR', opcoes))
    setValorTotal(parseFloat(contrato?.valorTotalDoContrato).toLocaleString('pt-BR', opcoes))
    setDescricao(contrato?.descricoes)
    setTipoContrato(contrato?.tipoDeContrato[0])
  }, [contrato]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event);
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
        <Input
          label="Razaão Social"
          id="razaoSocial"
          column="1 / 4"
          value={razaoSocial}
          required
          disabled
          onChange={({ target }) => setRazaoSocial(target.value)}
        />

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
          // onChange={({ target }) => setDataInicial(new Date(target.value))}
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
              disabled
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
              disabled
              onChange={({ target }) => setTipoContrato(target.value)}
            />
            Produto
          </label>
        </div>

        <Input
          label="Valor Unitário"
          id="valorUnitario"
          value={valorUnitario}
          required
          disabled
          onChange={({ target }) => setValorUnitario(target.value)}
        />

        <Input
          label="Qtd. de pontos de função"
          id="qtdDePontosFuncao"
          value={qtdDePontosFuncao}
          required
          disabled
          onChange={({ target }) => setQtdDePontosFuncao(target.value)}
        />
        <Input
          label="Valor Total do Contrato"
          id="valorTotal"
          value={valorTotal}
          disabled
        />

        <div style={{ gridColumn: "1/-1" }}>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            rows={10}
            id="descricao"
            value={descricao}
            disabled
            onChange={({ target }) => setDescricao(target.value)}
          />
        </div>
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
