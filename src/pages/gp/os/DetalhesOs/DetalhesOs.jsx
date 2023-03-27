import { React, useState } from "react";
import { useParams } from "react-router-dom";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";
import { Botao } from "../../../../components/Botao/Botao";

export const DetalhesOs = () => {
  const ListEmpresa = [
    { id: 10000, name: "Empresa 1", contrato: 11111, responsavel: "joao" },
    { id: 20000, name: "Empresa 2", contrato: 22222, responsavel: "pedro" },
    { id: 30000, name: "Empresa 3", contrato: 33333, responsavel: "lucas" },
  ];

  const osList = [
    { id: 1, name: "OS 1", status: "Aberto" },
    { id: 2, name: "OS 2", status: "Em execução" },
    { id: 3, name: "OS 3", status: "Finalizada" },
  ];

  const { id } = useParams();
  const os = osList.find((os) => os.id.toString() === id);


  const [numeroOS, setNumeroOs] = useState("os-1234");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [numeroContrato, setNumeroContrato] = useState("");
  const [data, setData] = useState("");
  const [horas, setHoras] = useState("");
  const [pontosDeFuncao, setPontosDeFuncao] = useState("");
  const [descricao, setDescricao] = useState("");

  const [empresaSelecionada, setEmpresaSelecionada] = useState({});

  function execetuarOs() {
    window.history.back();
    window.alert('Os executada com sucesso!');
    console.log("executou");
  }
  function finalizarOs() {
    window.history.back();
    window.alert('Os finalizada com sucesso!');
    console.log("finalizou");
  }

  function handleEmpresaSelecionada(event) {
    const empresaId = parseInt(event.target.value);
    const empresa = ListEmpresa.find((empresa) => empresa.id === empresaId);

    setEmpresaSelecionada(empresa);
    setRazaoSocial(empresa.name);
    setCnpj(empresa.id);
    setNumeroContrato(empresa.contrato);
    setResponsavel(empresa.responsavel);
  }

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <div>
      <ContainerFormulario titulo="Cliente">
        <Input
          label="N° OS"
          id="numeroOS"
          value={numeroOS}
          required
          disabled
          onChange={({ target }) => setNumeroOs(target.value)}
        />

        <div style={{ gridColumn: "2 /4" }}>
          <label htmlFor="razao-social">Razão Social</label>
          <select
            disabled
            id="razao-social"
            value={razaoSocial}
            onChange={handleEmpresaSelecionada}
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
          label="N° Contrato"
          id="numeroContrato"
          value={numeroContrato}
          disabled
          required
          onChange={({ target }) => setNumeroContrato(target.value)}
        />

        <Input
          style={{ display: "none" }}
          label="Data"
          id="data"
          value={data}
          required
          disabled
          type={"date"}
          onChange={({ target }) => setData(target.value)}
        />

        <Input
          label="Qtd. Hora"
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
      {os && os.status === 'Aberto' && <Botao name={"EXECUTAR"} onClick={execetuarOs} />}
      {os && os.status === 'Em execução' && <Botao name={"FINALIZAR"} onClick={finalizarOs} />}

    </div>
  );
};
