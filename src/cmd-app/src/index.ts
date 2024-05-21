import LoadCities from "./database/scripts/city";
import LoadStates from "./database/scripts/state";

LoadStates()
    .then(() => LoadCities());