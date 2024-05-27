import { StateDb } from "../../../../api-app/src/persistence/definitions";
import data from "../data/state.json";

export default function LoadStates(): Promise<void> {
    return new Promise((resolve) => {
        StateDb.sync({ force: true }).then(() => {
            const stateList: any[] = [];
    
            data.map((item) => {
                stateList.push({ key: item.key, name: item.name });
            });
    
            StateDb.bulkCreate(stateList);

            resolve();
        });
    });
}