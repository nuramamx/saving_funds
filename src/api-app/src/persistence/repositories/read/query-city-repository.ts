import { db } from "../../instance";
import { QueryTypes } from "sequelize";
import { ViewName } from "../../names/view-name";
import City from "../../../domain/entities/city";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import CityModel from "../../models/city-model";

export default class QueryCityRepository implements QueryRepositoryInfo<City> {
   all = async (): Promise<City[]> => {
    const [results]: any = await db.sequelize.query(
      ViewName.CITY_ALL,
      {
        type: QueryTypes.SELECT,
      }
    );

    const data = results.map((city: CityModel) => new City(city.id, city.name, city.state_id));
    
    return [];
  }
}