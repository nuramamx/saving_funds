import fs from "fs";
import Excel from "exceljs";
import WithdrawalSpec from "./withdrawal-spec";

export default function WithdrawalLoader(): Promise<void> {
  const parseDate = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate() + 1).toString().padStart(2, '0')}`;
;
  };

  const replaceRareSymbols = (value: string) => {
    return value.replace('—', 'Ñ').replace('…', 'E').replace('¡', 'A').replace('”', 'O').replace('Õ', 'I');
  };

  return new Promise(async (resolve) => {
    const list: WithdrawalSpec[] = [];
    const workbookWriter = new Excel.Workbook();
    const workbookReader = new Excel.Workbook();
    const buffer = fs.readFileSync(`./src/seed/withdrawal/retiros.xlsx`);
  
    await workbookReader.xlsx.load(buffer);

    const worksheetReader = workbookReader.getWorksheet('retiros');

    worksheetReader?.eachRow((row, rx) => {
      const name = row.getCell(3).value?.toString().toLocaleUpperCase() ?? '';
      const amount = Number(row.getCell(4).value) ?? 0;
      const appliedAt = row.getCell(5).value?.toString() ?? '';
      const isDecease = row.getCell(6).value?.toString() ?? '';
      const isLeave = row.getCell(7).value?.toString() ?? '';

      if (name === '') return;
      if (isNaN(amount) || amount <= 0) return;
      if (appliedAt === '') return;

      list.push({
        name: replaceRareSymbols(name),
        amount: amount,
        appliedAt: parseDate(new Date(appliedAt)),
        isYields: '',
        isLeave: isLeave === 'True' ? 'x' : '',
        isDecease: isDecease === 'True' ? 'x' : ''
      });
    });

    console.log(JSON.stringify(list));

    const worksheetWriter = workbookWriter.addWorksheet('contributions');
    worksheetWriter.addRow(["NOMBRE", "MONTO", "APLICADO EN", "¿RENDIMIENTOS?", "¿BAJA?", "¿MUERTE?"]);

    list.forEach((data, index) => {
      worksheetWriter.addRow([data.name, data.amount, data.appliedAt, data.isYields, data.isLeave, data.isDecease]);
    });

    workbookWriter.xlsx.writeFile(`./dist/withdrawals.xlsx`);

    resolve();
  });
}