import React from 'react'
import { Lista } from '../../../../components/Lista/Lista'

export const OsEmExecucao = () => {
    const osList = [
        { id: 1, name: "OS 1", status: "Aberto" },
        { id: 2, name: "OS 2", status: "Em execução" },
        { id: 3, name: "OS 3", status: "Finalizada" },
        { id: 4, name: "OS 4", status: "Finalizada" },
        { id: 4, name: "OS 4", status: "Finalizada" },
        { id: 4, name: "OS 4", status: "Finalizada" },
        { id: 4, name: "OS 4", status: "Finalizada" },
        { id: 4, name: "OS 4", status: "Finalizada" },
        { id: 4, name: "OS 4", status: "Finalizada" },
        { id: 4, name: "OS 4", status: "Finalizada" },
        { id: 4, name: "OS 4", status: "Finalizada" },
      ];
  return (
    <div>
        <Lista titulo={`Os's em execução`} lista={osList}/>
    </div>
  )
}
