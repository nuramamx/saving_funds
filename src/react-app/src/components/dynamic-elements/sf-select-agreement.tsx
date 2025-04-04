import { memo, useEffect } from "react"
import { SFNumberInputInfo } from "../form/sf-number-input";
import CommandResponseInfo from "../../core/interfaces/info/command-response-info";
import useCacheStore from "../../core/stores/cache-store";
import AppConstants from "../../core/constants/app-constants";
import AgreementInfo from "../../core/interfaces/info/agreement-info";
import useAuthStore from "../../core/stores/auth-store";

const SFSelectAgreement = memo(({ id, name, value, readonly, issues, onChange }: SFNumberInputInfo) => {
  const { agreements, setAgreements } = useCacheStore();
  const { token, user } = useAuthStore();

  useEffect(() => {
    const fetchAgreements = async () => {
      const result = await fetch(AppConstants.apiAgreement, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const response = await result.json() as CommandResponseInfo;
      const agreements = response.data as AgreementInfo[];

      setAgreements(agreements);
    };

    if (agreements.length <= 0) fetchAgreements();
  }, [agreements.length, setAgreements]);

  return (
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="select" style={{display: "grid"}}>
      <select
        id={id}
        value={value}
        disabled={user.role !== 'ADMIN' ? true : readonly}
        onChange={(e) => onChange ? onChange(parseInt(e.target.value)) : undefined }>
        <option value={0}>---</option>
        {agreements.map((option: AgreementInfo) => [
          <option key={option.id} value={option.id}>{option.name}</option>
        ])}
        </select>
      </div>
      <span className="has-text-danger" style={{ fontSize: '13px' }}>{issues?.find(x => `${x.path.join('-')}` === id)?.message}</span>
    </div>
  )
});

export default SFSelectAgreement;