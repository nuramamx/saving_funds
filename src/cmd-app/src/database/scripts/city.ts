import { CityDb } from "../../../../react-app/src/core/persistence/definitions";
import data from "../data/city.json";

export default function LoadCities(): Promise<void> {
    return new Promise((resolve) => {
        CityDb.sync({ force: true }).then(() => {
            const jsonData: ({ [key: string]: string[] }) = data;
            const cityList: any[] = [];
    
            Object.keys(jsonData).forEach((key: string) => {
                jsonData[key].map((city: string) => {
                    cityList.push({ state_id: key, name: city.toUpperCase() });
                });
            });
    
            CityDb.bulkCreate(cityList);

            resolve();
        });
    });
}