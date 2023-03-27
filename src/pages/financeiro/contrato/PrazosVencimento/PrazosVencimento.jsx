import React from 'react'
import { TabelaPrazos } from '../../../../components/TabelaPrazos/TabelaPrazos'

export const PrazosVencimento = () => {
    const dados = [
        {
          id: 1,
          numeroContrato: "0001",
          nomeEmpresa: "Empresa A",
          dataVencimento: "01/01/2022",
        },
        {
          id: 2,
          numeroContrato: "0002",
          nomeEmpresa: "Empresa B",
          dataVencimento: "02/02/2022",
        },
        {
          id: 3,
          numeroContrato: "0003",
          nomeEmpresa: "Empresa C",
          dataVencimento: "03/03/2022",
        },
      ];
  return (
    <div>
        <h2 style={{display: 'grid',margin : '20px', justifyContent: 'center'}}>Prazos de vencimento</h2>
        <TabelaPrazos dados={dados} />
    </div>
  )
}
