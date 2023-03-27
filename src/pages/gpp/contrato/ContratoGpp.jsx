import React from 'react'
import { Lista } from '../../../components/Lista/Lista'

export const ContratoGpp = () => {
    const userList = [
        { id: "5555", name: "11111" },
        { id: "4444", name: "22222" },
        { id: "3333", name: "33333" },
      ];
      return (
        <Lista lista={userList} titulo={'Lista de contratos'}/>
      )
    }
