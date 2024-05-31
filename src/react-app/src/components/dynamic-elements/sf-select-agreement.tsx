import { memo, useEffect } from "react"
import { SFNumberInputInfo } from "../form/interfaces/sf-input-info";
import CommandResponseInfo from "../../core/interfaces/command-response-info";
import useCacheStore from "../../core/stores/cache-store";
import AppConstants from "../../core/constants/app-constants";
import AgreementInfo from "../../core/interfaces/agreement-info";

const SFSelectAgreement = memo(({ id, name, value, onChange }: SFNumberInputInfo) => {
  const { agreements, setAgreements } = useCacheStore();

  useEffect(() => {
    const fetchAgreements = async () => {
      const result = await fetch(AppConstants.apiAgreements, {
        method: 'GET'
      });

      const response = await result.json() as CommandResponseInfo;
      const agreements = JSON.parse(response.data!) as AgreementInfo[];

      setAgreements(agreements);

      console.log("Agreements loaded...");
    };

    if (agreements.length <= 0) fetchAgreements();
  }, [agreements.length, setAgreements]);

  return (
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="select" style={{display: "grid"}}>
      <select id={id} value={value} onChange={(e) => onChange(parseInt(e.target.value))}>
        <option value={0}>---</option>
        {agreements.map((option: AgreementInfo) => [
          <option key={option.id} value={option.id}>{option.name}</option>
        ])}
        </select>
      </div>
    </div>
  )
});

export default SFSelectAgreement;