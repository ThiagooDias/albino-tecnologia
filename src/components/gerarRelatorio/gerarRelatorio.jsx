import React from "react";

export const BotaoGerarRelatorio = (credencial, relatorio, id) => {
  // GET
  const getRelatorioContrato = async () => {
    fetch(`http://34.16.131.174/api/v1/relatorio/contrato/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: {credencial},
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
  return (
    <button style={{ margin: "16px auto" }} onClick={gerarRelatorio}>
      RELATÓRIO
    </button>
  );
};
