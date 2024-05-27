import { memo, useEffect, useState } from "react"
import CityInfo from "../../core/interfaces/city-info";
import CommandResponseInfo from "../../core/interfaces/command-response-info";

const SFSelectCity = memo(() => {
  const [cities, setCities] = useState<CityInfo[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      const result = await fetch("http://localhost:8081/city", {
        method: 'GET'
      });

      const response = await result.json() as CommandResponseInfo;
      const cities = JSON.parse(response.data!) as CityInfo[];

      setCities(cities);
    };

    fetchCities();
  }, []);

  return (
    <div className="select">
      <select>
        {cities.map((city, index) => (
          <option key={index}>{city.name}</option>
        ))}
      </select>
    </div>
  )
});

export default SFSelectCity;