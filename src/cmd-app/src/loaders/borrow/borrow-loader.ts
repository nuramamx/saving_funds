import fs from "fs";
import Excel from "exceljs";
import BorrowSpec from "./borrow-spec";

export default function BorrowLoader(): Promise<void> {
  const parseDate = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate() + 1).toString().padStart(2, '0')}`;
;
  };

  const replaceRareSymbols = (value: string) => {
    return value.replace('—', 'Ñ').replace('…', 'E').replace('¡', 'A').replace('”', 'O').replace('Õ', 'I').replace('  ', ' ').replace('MA.', 'MARIA');
  };

  const calculatePeriod = (period: number, isFortnightly: boolean) => {
    if (isFortnightly) {
      if (period === 24) return 1;
      if (period === 48) return 2;
      if (period === 72) return 3;
      if (period === 96) return 4;
    } else {
      if (period === 12) return 1;
      if (period === 24) return 2;
      if (period === 36) return 3;
      if (period === 48) return 4;
    }

    return 0;
  }

  return new Promise(async (resolve) => {
    const list: BorrowSpec[] = [];
    const workbookWriter = new Excel.Workbook();
    const workbookReader = new Excel.Workbook();
    const buffer = fs.readFileSync(`./src/seed/borrow/prestamos.xlsx`);
  
    await workbookReader.xlsx.load(buffer);

    const worksheetReader = workbookReader.getWorksheet('prestamos');

    worksheetReader?.eachRow((row, rx) => {
      const fileNumber = row.getCell(4).value?.toString().toLocaleUpperCase() ?? '';
      const name = row.getCell(5).value?.toString().toLocaleUpperCase() ?? '';
      const agreement = row.getCell(6).value?.toString().toLocaleUpperCase() ?? '';
      const amount = Number(row.getCell(7).value) ?? 0;
      const period = Number(row.getCell(20).value) ?? 0;
      const annualRate = Number(row.getCell(8).value) ?? 0;
      const startAt = row.getCell(2).value?.toString() ?? '';
      const isSettled = row.getCell(22).value?.toString() ?? '';

      if (name === '') return;
      if (isNaN(amount) || amount <= 0) return;
      if (isNaN(period) || period <= 0) return;
      if (calculatePeriod(period, agreement !== 'ISS') === 0) return;
      if (isNaN(annualRate) || period <= 0) return;
      if (startAt === '') return;

      list.push({
        fileNumber: fileNumber,
        name: replaceRareSymbols(name),
        amount: amount,
        period: calculatePeriod(period, agreement !== 'ISS'),
        annualRate: annualRate,
        startAt: `${startAt}-01-01`,
        isFortnightly: agreement !== 'ISS' ? 'x' : '',
        isSettled: isSettled === 'LIQUIDADO' ? 'x' : ''
      });
    });

    const worksheetWriter = workbookWriter.addWorksheet('borrows');
    worksheetWriter.addRow(["FOLIO", "NOMBRE", "MONTO SOLICITADO", "PERIODO", "INTERÉS ANUAL", "FECHA", "¿QUINCENAL?", "¿LIQUIDADO?"]);

    list.forEach((data, index) => {
      worksheetWriter.addRow([data.fileNumber, data.name, data.amount, data.period, data.annualRate, data.startAt, data.isFortnightly, data.isSettled]);
    });

    workbookWriter.xlsx.writeFile(`./dist/borrows.xlsx`);

    resolve();
  });
}