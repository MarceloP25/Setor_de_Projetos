import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; 
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import "./exportTabela.css";

type Row = {
  id: string;
  nome: string;
  projeto: string;
  tipoBolsa: string;
  cpf: string;
  campus: string;
  banco: string;
  agencia: string;
  conta: string;
  valor: number;
};

export default function TelaExportTabela() {
  const [dados, setDados] = useState<Row[]>([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "membros"));
        const lista: Row[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            nome: data.nome || "",
            projeto: data.projetos || "",
            tipoBolsa: data.vinculo || "",
            cpf: data.cpf || "",
            campus: data.campus || "Rio Pomba",
            banco: data.banco || "",
            agencia: data.agencia || "",
            conta: data.conta || "",
            valor: Number(data.valorBolsa) || 0,
          };
        });
        setDados(lista);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchDados();
  }, []);

  const projetos = Array.from(new Set(dados.map(d => d.projeto)));

  const getDiaMesAtual = () => {
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}`;
  };

  const exportXLSX = async () => {
    const diaMes = getDiaMesAtual();

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Membros");

    sheet.columns = [
      { header: "Data", key: "data", width: 30 },
      { header: "Aluno", key: "nome", width: 30 },
      { header: "Projeto", key: "projeto", width: 30 },
      { header: "Tipo de Bolsa", key: "tipoBolsa", width: 30 },
      { header: "CPF", key: "cpf", width: 30 },
      { header: "Campus", key: "campus", width: 30 },
      { header: "Banco", key: "banco", width: 30 },
      { header: "Agência", key: "agencia", width: 30 },
      { header: "Conta Corrente", key: "conta", width: 30 },
      { header: "Valor Bolsa", key: "valor", width: 30 },
    ];

    dados.forEach(d => {
      sheet.addRow({
        data: diaMes,
        nome: d.nome,
        projeto: d.projeto,
        tipoBolsa: d.tipoBolsa,
        cpf: d.cpf,
        campus: d.campus,
        banco: d.banco,
        agencia: d.agencia,
        conta: d.conta,
        valor: d.valor,
      });
    });

    // Estilo do cabeçalho (linha 1)
    sheet.getRow(1).eachCell(cell => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF027313" }, 
      };
      cell.font = { bold: true, color: { argb: "FF000000" } };
      cell.alignment = { horizontal: "center" };
      cell.border = {
        top: { style: "medium" },
        left: { style: "medium" },
        bottom: { style: "medium" },
        right: { style: "medium" },
      };
    });

    // Bordas para todas as linhas de dados
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.eachCell(cell => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
    });

    // Exporta para arquivo
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "arquivo.xlsx");
  };

  const diaMesAtual = getDiaMesAtual();

  return (
    <div className="export-container">
      <h1 className="export-title">Exportar Tabela de Membros</h1>

      <table className="export-table">
        <thead>
          <tr><th>Projeto</th></tr>
        </thead>
        <tbody>
          {projetos.map((p, idx) => (
            <tr key={idx}><td>{p}</td></tr>
          ))}
        </tbody>
      </table>

      <table className="export-table full">
        <thead>
          <tr>
            <th>Data</th>
            <th>Aluno</th>
            <th>Projeto</th>
            <th>Tipo de Bolsa</th>
            <th>CPF</th>
            <th>Campus</th>
            <th>Banco</th>
            <th>Agência</th>
            <th>Conta Corrente</th>
            <th>Valor Bolsa</th>
          </tr>
        </thead>
        <tbody>
          {dados.map(d => (
            <tr key={d.id}>
              <td>{diaMesAtual}</td>
              <td>{d.nome}</td>
              <td>{d.projeto}</td>
              <td>{d.tipoBolsa}</td>
              <td>{d.cpf}</td>
              <td>{d.campus}</td>
              <td>{d.banco}</td>
              <td>{d.agencia}</td>
              <td>{d.conta}</td>
              <td>{d.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="export-button" onClick={exportXLSX}>
        Exportar tudo para XLSX
      </button>
    </div>
  );
}
