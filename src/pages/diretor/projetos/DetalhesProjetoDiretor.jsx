import { React, useState, useEffect } from "react";
import axios from "axios";
import { ContainerFormulario } from "../../../components/Formulario/Formulario";
import { Input } from "../../../components/Input/Input";
import { Botao } from "../../../components/Botao/Botao";
import { useParams } from "react-router-dom";
import Modal from "../../../components/Modal/Modal";


export const DetalhesProjetoDiretor = () => {
  const { id } = useParams();
  const [numeroOS, setNumeroOS] = useState("");
  const [nome, setNome] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("")
  const [gp, setGp] = useState("");
  const [usernameGp, setUsernameGp] = useState("");

    // GET - relatorio
    const getRelatorioContrato = async () => {
      fetch(`http://34.16.131.174/api/v1/relatorio/projetos/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Não foi possível obter o relatório do contrato");
          }
          return response.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          window.open(url);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    async function gerarRelatorio() {
      try {
        const resultado = await getRelatorioContrato();
        console.log(resultado);
      } catch (error) {
        console.log(error);
      }
    }

  // GET
  let usuario = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  usuario = 'gpp'
  password = 'senha123'

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
        url: `http://34.16.131.174/api/v1/projeto/${id}`,
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
      setNumeroOS(data?.os?.codigoDaOS);
      setNome(data?.nome);
      setResponsavel(data?.os?.contrato?.empresa?.responsavel?.nome);
      setDescricao(data?.descricao);
      setStatus(data?.status)

      const dataInicialArray = data?.dataDeInicio;
      if (dataInicialArray) {
        const novaData = new Date(
          dataInicialArray[0],
          dataInicialArray[1] - 1,
          dataInicialArray[2]
        );
        setDataInicial(novaData);
      }

      const dataFinalArray = data?.dataDeTermino;
      if (dataFinalArray) {
        const novaDataFinal = new Date(
          dataFinalArray[0],
          dataFinalArray[1] - 1,
          dataFinalArray[2]
        );
        setDataFinal(novaDataFinal);
      }
    };
    fetchData();
  }, []);

  // GET - gp
  const [GpList, setGpList] = useState([]);
  console.log("gp", GpList);
  const getUsuarios = async () => {
    try {
      const config = {
        mode: "no-cors",
        method: "get",
        url: "http://34.16.131.174/api/v1/usuario",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic YWRtaW46c2VuaGExMjM=",
        },
        params: {
          page: 0,
          size: "*",
          sort: "nome,asc",
        },
      };

      const response = await axios.request(config);
      console.log("RESPONSE:", response);
      return response.data.content;
    } catch (error) {
      console.log("ERROR ", error);
      console.log("MENSAGEM DE ERRO: ", error.response.config.params);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsuarios();
      console.log("data", data);
      const usuariosAtivos = data.filter((usuario) => {
        const isAtivo = usuario.status === "ativo";
        const isRoleGP = usuario.roles[0].roleName === "ROLE_GP";
        return isAtivo && isRoleGP;
      });
      setGpList(usuariosAtivos);
    };
    fetchData();
  }, []);

  // MODAL
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleSelectChange = (event) => {
    const idSelecionado = parseInt(event.target.value);
    const user = GpList.find((item) => item.id === idSelecionado);
    setUsernameGp(user.username);
  };

  const DistribuirProjeto = async () => {
    try {
      let data = JSON.stringify({
        usernameDoUsuario: usernameGp,
      });

      const config = {
        mode: "no-cors",
        method: "put",
        maxBodyLength: Infinity,
        url: `http://34.16.131.174/api/v1/projeto/distribuir/username/${id}`,
        headers: {
          Authorization: credencial,
          "Content-Type": "application/json",
        },

        data: data,
      };

      const response = await axios.request(config);
      console.log(response);
      window.history.back();
      window.alert("Projeto distribuido com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ContainerFormulario titulo="Projeto">
        <Input
          label="Ordem de serviço"
          id="numeroOS"
          value={numeroOS}
          required
          disabled
          onChange={({ target }) => setNome(target.value)}
        />

        <Input
          label="Nome"
          id="nome"
          column="2 / -1"
          value={nome}
          required
          disabled
          onChange={({ target }) => setNome(target.value)}
        />

        <Input
          label="Responsável"
          id="responsavel"
          column="1 / 3"
          value={responsavel}
          required
          disabled
          onChange={({ target }) => setResponsavel(target.value)}
        />

        <Input
          label="Data inicial"
          id="data_inicial"
          value={dataInicial.toISOString().substr(0, 10)}
          type="date"
          required
          disabled
        />

        <Input
          label="Data final"
          id="data_final"
          value={dataFinal.toISOString().substr(0, 10)}
          type="date"
          disabled
          required
        />

        <div style={{ gridColumn: "1/-1" }}>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            rows={10}
            id="descricao"
            readOnly
            value={descricao}
            onChange={({ target }) => setDescricao(target.value)}
          />
        </div>
      </ContainerFormulario>
      <button style={{ margin: "16px auto" }} onClick={gerarRelatorio}>
        RELATÓRIO
      </button>
    </div>
  );
};
