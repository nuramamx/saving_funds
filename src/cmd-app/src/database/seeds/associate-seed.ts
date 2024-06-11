import { AssociateDb } from "../../../../api-app/src/persistence/definitions";

export default function ConfigAssociate(): Promise<void> {
  return new Promise((resolve) => {
    AssociateDb.sync({ force: true }).then(() => {
      resolve();
    });
  });
}