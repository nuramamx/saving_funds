import { AgreementDb } from "../../../../api-app/src/persistence/definitions";

export default function ConfigAgreement(): Promise<void> {
  return new Promise((resolve) => {
    AgreementDb.sync({ force: true }).then(() => {
      const list: any[] = [
        { name: "SFA" },
        { name: "SEP" },
        { name: "ISS" }
      ];

      AgreementDb.bulkCreate(list);

      resolve();
    });
  });
}