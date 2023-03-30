import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import axios from "axios";
import style from "./DetalhesCliente.module.css";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { format } from "date-fns";

export const DetalhesCliente = () => {
  const [empresa, setEmpresa] = useState({});
  const { id } = useParams();

  // cliente
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [inscricaoEstadual, setinscricaoEstadual] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState(new Date());

  const dataDeNascimentoFormatada = format(dataDeNascimento, "dd/MM/yyyy");

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

  useEffect(() => {
    setRazaoSocial(empresa.razaoSocial);
    setCnpj(empresa.cnpj);
    setinscricaoEstadual(empresa.inscricaoEstadual);
    setTelefone(empresa.numeroDeTelefone);
    setEmail(empresa.email);

    const dataNascimentoArray = empresa.dataDeNascimento;
    if (dataNascimentoArray) {
      const novaDataDeNascimento = new Date(
        dataNascimentoArray[0],
        dataNascimentoArray[1] - 1,
        dataNascimentoArray[2]
      );
      setDataDeNascimento(novaDataDeNascimento);
    }

    setCEP(empresa?.endereco?.cep)
    setCidade(empresa?.endereco?.cidade)
    setEstado(empresa?.endereco?.uf)
    setLogadouro(empresa?.endereco?.logradouro)
    setBairro(empresa?.endereco?.bairro)
    setNumero(empresa?.endereco?.numero)
    setComplemento(empresa?.endereco?.complemento)

    setResponsavel(empresa?.responsavel?.nome)
    setRG(empresa?.responsavel?.rg)
    setCPF(empresa?.responsavel?.cpf)
    setEmailResponsavel(empresa?.responsavel?.email)
    setTelefoneResponsavel(empresa?.responsavel?.numTelefone)
    setDepartamento(empresa?.responsavel?.departamento)
    setCargo(empresa?.responsavel?.cargo)

    setCEPResponsavel(empresa?.responsavel?.endereco?.cep)
    setCidadeResponsavel(empresa?.responsavel?.endereco?.cidade)
    setEstadoResponsavel(empresa?.responsavel?.endereco?.uf)
    setLogadouroResponsavel(empresa?.responsavel?.endereco?.logradouro)
    setBairroResponsavel(empresa?.responsavel?.endereco?.bairro)
    setNumeroResponsavel(empresa?.responsavel?.endereco?.numero)
    setComplementoResponsavel(empresa?.responsavel?.endereco?.complemento)

  }, [empresa]);

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
  const getEmpresa = async () => {
    try {
      let data = JSON.stringify({
        id: id,
      });

      const config = {
        mode: "no-cors",
        method: "get",
        maxBodyLength: Infinity,
        url: `http://34.16.131.174/api/v1/empresa/${id}`,
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
      const data = await getEmpresa();
      setEmpresa(data);
    };
    fetchData();
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };

  //PUT - ATUALIZAR
  const putEmpresa = async () => {
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
        method: "put",
        maxBodyLength: Infinity,
        url: `http://34.16.131.174/api/v1/empresa/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: credencial,
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    putEmpresa()
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Lógica para cancelar a edição e reverter as alterações
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
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
          disabled={!isEditing}
          onChange={({ target }) => setRazaoSocial(target.value)}
        />

        <Input
          label="CNPJ"
          id="cnpj"
          value={cnpj}
          required
          disabled={!isEditing}
          onChange={({ target }) => setCnpj(target.value)}
        />

        <Input
          label="Inscrição Estadual"
          id="inscricao_estadual"
          value={inscricaoEstadual}
          required
          disabled={!isEditing}
          onChange={({ target }) => setinscricaoEstadual(target.value)}
          placeholder={"00000"}
          // {...validarInscricaoEstadual}
        />

        <Input
          label="Telefone"
          id="telefone"
          value={telefone}
          required
          disabled={!isEditing}
          onChange={({ target }) => setTelefone(target.value)}
        />

        <Input
          label="Email"
          id="email"
          value={email}
          disabled={!isEditing}
          required
          onChange={({ target }) => setEmail(target.value)}
          placeholder={"example@example.com"}
          // {...validarEmail}
        />

        <Input
          label="Data de nascimento"
          id="dataDeNascimento"
          value={dataDeNascimento.toISOString().substr(0, 10)}
          type={"date"}
          disabled={!isEditing}
          required
          onChange={(event) => {
            const { value } = event.target;
            setDataDeNascimento(new Date(value));
          }}
        />
      </ContainerFormulario>

      <ContainerFormulario titulo="Endereço">
        <Input
          label="CEP"
          id="cep"
          value={CEP}
          disabled={!isEditing}
          required
          onChange={({ target }) => setCEP(target.value)}
        />

        <Input
          label="Cidade"
          id="cidade"
          value={cidade}
          disabled={!isEditing}
          required
          onChange={({ target }) => setCidade(target.value)}
          column="2 / 4"
        />

        <Input
          label="UF"
          id="uf"
          value={estado}
          disabled={!isEditing}
          required
          onChange={({ target }) => setEstado(target.value)}
        />

        <Input
          label="Logadouro"
          id="logadouro"
          value={logadouro}
          disabled={!isEditing}
          required
          onChange={({ target }) => setLogadouro(target.value)}
          column="1 / 3"
        />

        <Input
          label="Número"
          id="numero"
          value={numero}
          disabled={!isEditing}
          required
          onChange={({ target }) => setNumero(target.value)}
        />

        <Input
          label="Bairro"
          id="bairro"
          value={bairro}
          disabled={!isEditing}
          required
          onChange={({ target }) => setBairro(target.value)}
        />
        <Input
          label="Complemento"
          id="complemento"
          value={complemento}
          column={"1/-1"}
          disabled={!isEditing}
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
          disabled={!isEditing}
          required
          onChange={({ target }) => setResponsavel(target.value)}
        />

        <Input
          label="RG"
          id="rg"
          value={RG}
          disabled={!isEditing}
          required
          onChange={({ target }) => setRG(target.value)}
        />

        <Input
          label="CPF"
          id="cpf"
          value={CPF}
          disabled={!isEditing}
          required
          onChange={({ target }) => setCPF(target.value)}
        />

        <Input
          label="Telefone"
          id="telefoneResponsavel"
          value={telefoneResponsavel}
          disabled={!isEditing}
          required
          onChange={({ target }) => setTelefoneResponsavel(target.value)}
        />

        <Input
          label="Email"
          id="emailresponsavel"
          value={emailResponsavel}
          required
          disabled={!isEditing}
          onChange={({ target }) => setEmailResponsavel(target.value)}
        />

        <Input
          label="Departamento"
          id="departametno"
          value={departamento}
          disabled={!isEditing}
          required
          onChange={({ target }) => setDepartamento(target.value)}
        />

        <Input
          label="Cargo"
          id="cargo"
          value={cargo}
          disabled={!isEditing}
          required
          onChange={({ target }) => setCargo(target.value)}
        />
      </ContainerFormulario>

      <ContainerFormulario titulo={"Endereço do responsável"}>
        <Input
          label="CEP"
          id="cep"
          value={CEPResponsavel}
          disabled={!isEditing}
          required
          onChange={({ target }) => setCEPResponsavel(target.value)}
        />

        <Input
          label="Cidade"
          id="cidade"
          value={cidadeResponsavel}
          disabled={!isEditing}
          required
          onChange={({ target }) => setCidadeResponsavel(target.value)}
          column="2 / 4"
        />

        <Input
          label="UF"
          id="uf"
          value={estadoResponsavel}
          disabled={!isEditing}
          required
          onChange={({ target }) => setEstadoResponsavel(target.value)}
        />

        <Input
          label="Logadouro"
          id="logadouro"
          value={logadouroResponsavel}
          disabled={!isEditing}
          required
          onChange={({ target }) => setLogadouroResponsavel(target.value)}
          column="1 / 3"
        />

        <Input
          label="Número"
          id="numeroResponsavel"
          value={numeroResponsavel}
          disabled={!isEditing}
          required
          onChange={({ target }) => setNumeroResponsavel(target.value)}
        />

        <Input
          label="Bairro"
          id="bairroResponsavel"
          value={bairroResponsavel}
          disabled={!isEditing}
          required
          onChange={({ target }) => setBairroResponsavel(target.value)}
        />
        <Input
          label="Complemento"
          id="complementoResponsavel"
          value={complementoResponsavel}
          column={"1/-1"}
          disabled={!isEditing}
          required
          onChange={({ target }) => setComplementoResponsavel(target.value)}
        />
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
