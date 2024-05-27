import City from "../../../domain/entities/city";
import { CityDb } from "../../definitions";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";

export default class QueryCityRepository implements QueryRepositoryInfo<City> {
   all = async (): Promise<City[]> => {
    const data = await CityDb.findAll();
    const result = data.map((city: CityDb) => new City(city.id, city.name, city.stateId));
    
    return result;
  }
}