import fs from "fs";
import Excel from "exceljs";
import PaymentSpec from "./payment-spec";

export default function PaymentLoader(): Promise<void> {
  const fortnightToDate = (value: number, year: number) => {
    switch (Number(value)) {
      case 1:
        return `${year}-01-01`
      case 2:
        return `${year}-01-30`
      case 3:
        return `${year}-02-01`
      case 4:
        return `${year}-02-28`
      case 5:
        return `${year}-03-01`
      case 6:
        return `${year}-03-30`
      case 7:
        return `${year}-04-01`
      case 8:
        return `${year}-04-30`
      case 9:
        return `${year}-05-01`
      case 10:
        return `${year}-05-30`
      case 11:
        return `${year}-06-01`
      case 12:
        return `${year}-06-30`
      case 13:
        return `${year}-07-01`
      case 14:
        return `${year}-07-30`
      case 15:
        return `${year}-08-01`
      case 16:
        return `${year}-08-30`
      case 17:
        return `${year}-09-01`
      case 18:
        return `${year}-09-30`
      case 19:
        return `${year}-10-01`
      case 20:
        return `${year}-10-30`
      case 21:
        return `${year}-11-01`
      case 22:
        return `${year}-11-30`
      case 23:
        return `${year}-12-01`
      case 24:
        return `${year}-12-30`
      default:
        return `${year}-01-01`
    }
  };

  const replaceRareSymbols = (value: string) => {
    return value.replace('—', 'Ñ').replace('…', 'E').replace('¡', 'A').replace('”', 'O').replace('Õ', 'I').replace('  ', ' ').replace('MA.', 'MARIA');
  };

  return new Promise(async (resolve) => {
    const list: PaymentSpec[] = [];
    const workbookWriter = new Excel.Workbook();

    for (let year = 2008; year <= 2023; year++) {
      const workbookReader = new Excel.Workbook();
      const buffer = fs.readFileSync(`./src/seed/payment/${year}.xlsx`);
    
      await workbookReader.xlsx.load(buffer);

      const worksheet = workbookReader.getWorksheet(`${year}`);

      worksheet?.eachRow((row, rx) => {
        const fileNumber = row.getCell(5).value?.toString().toLocaleUpperCase() ?? '';
        const name = row.getCell(6).value?.toString().toLocaleUpperCase() ?? '';

        if (fileNumber === '') return;
        if (name === '') return;

        for (let i = 1; i <= 24; i++) {
          const fortnight = 7+i;
          const amount = Number(row.getCell(fortnight).value) ?? 0;

          if (!isNaN(amount) && amount > 0) {
            list.push({
              fileNumber: fileNumber,
              name: replaceRareSymbols(name),
              number: i,
              amount: amount,
              appliedAt: fortnightToDate(i, year)
            });
          }
        }
      });
    }

    const worksheet = workbookWriter.addWorksheet('payments');
    worksheet.addRow(["FOLIO", "NOMBRE", "# DE PAGO", "MONTO", "APLICADO EN"]);

    list.forEach((data, index) => {
      worksheet.addRow([data.fileNumber, data.name, data.number, data.amount, data.appliedAt]);
    });

    workbookWriter.xlsx.writeFile(`./dist/payments.xlsx`);

    resolve();
  });
}