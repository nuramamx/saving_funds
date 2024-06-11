import { memo, useEffect } from "react"
import { SFNumberInputInfo } from "../form/interfaces/sf-input-info";
import CommandResponseInfo from "../../core/interfaces/command-response-info";
import StateInfo from "../../core/interfaces/state-info";
import useCacheStore from "../../core/stores/cache-store";
import AppConstants from "../../core/constants/app-constants";

const SFSelectState = memo(({ id, name, value, onChange }: SFNumberInputInfo) => {
  const { states, setStates } = useCacheStore();

  useEffect(() => {
    const fetchStates = async () => {
      const result = await fetch(`${AppConstants.apiState}`, {
        method: 'GET'
      });

      const response = await result.json() as CommandResponseInfo;
      const states = JSON.parse(response.data!) as StateInfo[];

      setStates(states);

      console.log("States loaded...");
    };

    if (states.length <= 0) fetchStates();
  }, []);

  return (
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="select" style={{display: "grid"}}>
        <select id={id} value={value} onChange={(e) => onChange ? onChange(parseInt(e.target.value)) : undefined}>
          <option value={0}>---</option>
          {states.map((option: StateInfo) => [
            <option key={option.id} value={option.id}>{option.name}</option>
          ])}
        </select>
      </div>
    </div>
  )
});

export default SFSelectState;