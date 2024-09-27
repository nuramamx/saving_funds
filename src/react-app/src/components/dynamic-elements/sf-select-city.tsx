import { memo, useEffect } from "react"
import { objectToCamel } from "ts-case-convert";
import { SFNumberInputInfo } from "../form/sf-number-input";
import CityInfo from "../../core/interfaces/info/city-info";
import CommandResponseInfo from "../../core/interfaces/info/command-response-info";
import useCacheStore from "../../core/stores/cache-store";
import AppConstants from "../../core/constants/app-constants";

interface SFSelectCityParams extends SFNumberInputInfo {
  stateId: number;
}

const SFSelectCity = memo(({ id, name, value, stateId, issues, onChange }: SFSelectCityParams) => {
  const { cities, setCities } = useCacheStore();

  useEffect(() => {
    const fetchCities = async () => {
      const result = await fetch(AppConstants.apiCity, {
        method: 'GET'
      });

      const response = await result.json() as CommandResponseInfo;
      const cities = objectToCamel(response.data) as CityInfo[];

      setCities(cities);
    };

    if (cities.length <= 0) fetchCities();
  }, []);

  return (
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="select" style={{display: "grid"}}>
      <select id={id} value={value} onChange={(e) => onChange ? onChange(parseInt(e.target.value)) : undefined}>
        <option value={0}>---</option>
        {cities.filter((city: CityInfo) => city.stateId == stateId).map((option: CityInfo) => [
          <option key={option.id} value={option.id}>{option.name}</option>
        ])}
        </select>
      </div>
      <span className="has-text-danger" style={{ fontSize: '13px' }}>{issues?.find(x => `${x.path.join('-')}` === id)?.message}</span>
    </div>
  )
});

export default SFSelectCity;