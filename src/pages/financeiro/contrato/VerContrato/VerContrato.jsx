import React from 'react'
import { Lista } from '../../../../components/Lista/Lista';

export const VerContrato = () => {
  const userList = [
    { id: "5555", name: "joao" },
    { id: "4444", name: "maria" },
    { id: "3333", name: "pedro" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
  ];
  return (
    <Lista lista={userList} titulo={'Lista de contrato'}/>
  )
}

