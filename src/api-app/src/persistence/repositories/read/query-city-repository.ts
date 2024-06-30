import { db } from "../../instance";
import { ViewName } from "../../names/view-name";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import CityModel from "../../models/city-model";

export default class QueryCityRepository implements QueryRepositoryInfo<CityModel> {
   all = async (): Promise<CityModel[]> => {
    const [results, metadata]: any = await db.sequelize.query(ViewName.CITY_ALL);
    
    return results;
  }
}