import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { logAction } from '../LogAction';
import { useAuth } from '../../contexts/AuthContext';

export function exportToExcel(
  sheets: { sheetName: string; rows: any[] }[],
  fileName: string
) {
  const workbook = XLSX.utils.book_new();

  sheets.forEach(({ sheetName, rows }) => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

  const buffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const blob = new Blob([buffer], {
    type:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  saveAs(blob, `${fileName}.xlsx`);

  const { user } = useAuth();
  if (!user) return;
  logAction({
    user,
    action: 'Exportação de Excel',
    objectType: 'Excel',
    objectId: fileName + '-' + user.nome
  });
}
