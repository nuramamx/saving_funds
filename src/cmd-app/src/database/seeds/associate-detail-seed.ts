import { AssociateDetailDb } from "../../../../api-app/src/persistence/definitions";

export default function ConfigAssociateDetail(): Promise<void> {
  return new Promise((resolve) => {
    AssociateDetailDb.sync({ force: true }).then(() => {
      resolve();
    });
  });
}