import { AddressDb } from "../../../../api-app/src/persistence/definitions";

export default function ConfigAddress(): Promise<void> {
  return new Promise((resolve) => {
    AddressDb.sync({ force: true }).then(() => {
      resolve();
    });
  });
}