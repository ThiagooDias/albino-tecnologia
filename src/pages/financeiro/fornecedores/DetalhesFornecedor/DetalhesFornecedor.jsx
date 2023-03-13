import { React, useState } from "react";
import style from "./DetalhesFornecedor.module.css";
import { ContainerFormulario } from "../../../../components/Formulario/Formulario";
import { Input } from "../../../../components/Input/Input";

export const DetalhesFornecedor = () => {
    const dataFornecedor = {
        razaoSocial: 'nome da empresa',
        cnpj: '000000',
        inscricaoEstadual: '00000000',
        responsavel: 'nome do responsavel',
        telefone: '00000000',
        email: 'example@example.com',
        cep: '00000',
        cidade: 'paragominas',
        estado: 'para',
        logadouro: 'rua limoeiro',
        numero: '12',
        bairro: 'centro'
    }
  const [razaoSocial, setRazaoSocial] = useState(dataFornecedor.razaoSocial);
  const [cnpj, setCnpj] = useState(dataFornecedor.cnpj);
  const [inscricaoEstadual, setinscricaoEstadual] = useState(dataFornecedor.inscricaoEstadual);
  const [responsavel, setResponsavel] = useState(dataFornecedor.responsavel);
  const [telefone, setTelefone] = useState(dataFornecedor.telefone);
  const [email, setEmail] = useState(dataFornecedor.email);
  const [CEP, setCEP] = useState(dataFornecedor.cep);
  const [cidade, setCidade] = useState(dataFornecedor.cidade);
  const [estado, setEstado] = useState(dataFornecedor.estado);
  const [logadouro, setLogadouro] = useState(dataFornecedor.logadouro);
  const [numero, setNumero] = useState(dataFornecedor.numero);
  const [bairro, setBairro] = useState(dataFornecedor.bairro);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
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
      <ContainerFormulario titulo="Fornecedor">
        <Input
          label="Razão Social"
          id="razao-social"
          column="1 / 3"
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
        />

        <Input
          label="Responsável"
          id="responsavel"
          column="1 / 3"
          value={responsavel}
          required
          disabled={!isEditing}
          onChange={({ target }) => setResponsavel(target.value)}
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
          required
          disabled={!isEditing}
          onChange={({ target }) => setEmail(target.value)}
        />
      </ContainerFormulario>

      <ContainerFormulario titulo="Endereço">
        <Input
          label="CEP"
          id="cep"
          value={CEP}
          required
          disabled={!isEditing}
          onChange={({ target }) => setCEP(target.value)}
        />

        <Input
          label="Cidade"
          id="cidade"
          value={cidade}
          required
          disabled={!isEditing}
          onChange={({ target }) => setCidade(target.value)}
          column="2 / 4"
        />

        <Input
          label="UF"
          id="uf"
          value={estado}
          required
          disabled={!isEditing}
          onChange={({ target }) => setEstado(target.value)}
        />

        <Input
          label="Logadouro"
          id="logadouro"
          value={logadouro}
          required
          disabled={!isEditing}
          onChange={({ target }) => setLogadouro(target.value)}
          column="1 / 3"
        />

        <Input
          label="Número"
          id="numero"
          value={numero}
          required
          disabled={!isEditing}
          onChange={({ target }) => setNumero(target.value)}
        />

        <Input
          label="Bairro"
          id="bairro"
          value={bairro}
          required
          disabled={!isEditing}
          onChange={({ target }) => setBairro(target.value)}
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
