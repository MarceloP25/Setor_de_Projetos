export const enviarDadosParaSheetDB = async () => {
  const dados = {
    nome: localStorage.getItem("nome") || "",
    email: localStorage.getItem("email") || "",
    telefone: localStorage.getItem("telefone") || "",
    cpf: localStorage.getItem("cpf") || "",
    sexo: localStorage.getItem("sexo") || "",
    edital: localStorage.getItem("edital") || "",
    nivelEnsino: localStorage.getItem("nivelEnsino") || "",
    cursoSelecionado: localStorage.getItem("cursoSelecionado") || "",
    projetos: localStorage.getItem("projetos") || "",
    vinculo: localStorage.getItem("vinculo") || "",
    valorBolsa: localStorage.getItem("valorBolsa") || "",
    banco: localStorage.getItem("banco") || "",
    agencia: localStorage.getItem("agencia") || "",
    conta: localStorage.getItem("conta") || "",
  };

  try {
    const resposta = await fetch("https://sheetdb.io/api/v1/z5bruplvghwm8",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dados }),
    });

    const resultado = await resposta.json();
    console.log("✅ Dados enviados com sucesso:", resultado);
    return resultado;
  } catch (erro) {
    console.error("❌ Erro ao enviar dados para SheetDB:", erro);
    throw erro;
  }
};
