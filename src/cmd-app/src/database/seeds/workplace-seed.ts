import { WorkplaceDb } from "../../../../api-app/src/persistence/definitions";

export default function ConfigWorkplace(): Promise<void> {
  return new Promise((resolve) => {
    WorkplaceDb.sync({ force: true }).then(() => {
      resolve();
    });
  });
}