import { React, useState } from "react";
// import style from './CadastrarOs.module.css'
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { Botao } from "../../../../components/Botao/Botao";

export const CadastrarOs = () => {
  const ListEmpresa = [
    { id: 10000, name: "Empresa 1", contrato: 11111, responsavel: "joao" },
    { id: 20000, name: "Empresa 2", contrato: 22222, responsavel: "pedro" },
    { id: 30000, name: "Empresa 3", contrato: 33333, responsavel: "lucas" },
  ];

  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [numeroContrato, setNumeroContrato] = useState("");
  const [data, setData] = useState("");
  const [horas, setHoras] = useState("");
  const [pontosDeFuncao, setPontosDeFuncao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [empresaSelecionada, setEmpresaSelecionada] = useState({});

  // POST
  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  function gerarCredencialBase64(username, password) {
    var token = username + ":" + password;
    var hash = btoa(token); // codifica a string em Base64
    return "Basic " + hash; // adiciona o prefixo "Basic" e retorna a credencial
  }
  const credencial = gerarCredencialBase64(usuario, password);

  const postOS = async () => {
    try {
      let data = JSON.stringify({
        descricao: descricao,
        qtdDeHoras: {
          hour: horas,
          minute: 0,
          second: 0,
          nano: 0,
        },
        qtdPontosDeFuncao: pontosDeFuncao,
        idDoResponsavel: 0,
        idDaEmpresa: 0,
        idDoContrato: 0,
      });

      console.log(data);
      const config = {
        mode: "no-cors",
        method: "post",
        maxBodyLength: Infinity,
        url: "http://34.16.131.174/api/v1/os",
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

  function handleContatratoSelecionada(event) {
    const empresaId = parseInt(event.target.value);
    const empresa = ListEmpresa.find((empresa) => empresa.id === empresaId);

    setEmpresaSelecionada(empresa);
    setRazaoSocial(empresa.name);
    setCnpj(empresa.id);
    setNumeroContrato(empresa.contrato);
    setResponsavel(empresa.responsavel);
  }

  return (
    <form onSubmit={handleSubmit}>
      <ContainerFormulario titulo="Ordem de serviço">
        <div>
          <label htmlFor="razao-social">Contrato</label>
          <select
            id="razao-social"
            value={numeroContrato}
            onChange={handleContatratoSelecionada}
          >
            <option disabled value="">
              Selecione uma opção
            </option>
            {ListEmpresa.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.name}
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
          column="1 / 4"
          value={responsavel}
          disabled
          required
          onChange={({ target }) => setResponsavel(target.value)}
        />

        <Input
          label="Data"
          id="data"
          value={data}
          required
          type={"date"}
          onChange={({ target }) => setData(target.value)}
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
