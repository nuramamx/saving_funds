import CityDb from "../../../../api-app/src/persistence/models/city-db";
import data from "../data/city.json";

export default function ConfigCity(): Promise<void> {
  return new Promise((resolve) => {
    CityDb.sync({ force: true }).then(() => {
      const jsonData: ({ [key: string]: string[] }) = data;
      const cityList: any[] = [];

      Object.keys(jsonData).forEach((key: string) => {
        jsonData[key].map((city: string) => {
          cityList.push({ stateId: key, name: city.toUpperCase() });
        });
      });

      CityDb.bulkCreate(cityList);

      resolve();
    });
  });
}