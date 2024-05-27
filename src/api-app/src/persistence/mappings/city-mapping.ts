import { createMap } from "@automapper/core";
import mapper from "./mapper";
import { CityDb } from "../definitions";
import City from "../../domain/entities/city";

const CityMapping = () => {
  return createMap(mapper, CityDb, City);
}

export default CityMapping;