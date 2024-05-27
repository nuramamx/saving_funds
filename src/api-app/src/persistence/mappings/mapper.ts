import { classes } from "@automapper/classes";
import { createMap, createMapper } from "@automapper/core";
import { CityDb } from "../definitions";
import City from "../../domain/entities/city";

export const mapper = createMapper({
  strategyInitializer: classes()
});

createMap(mapper, CityDb, City);

export default mapper;