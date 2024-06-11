import { useEffect, useState } from "react";
import SFMoneyInput from "../../../components/form/sf-money-input";
import SFSelectInput from "../../../components/form/sf-select-input";
import SFPercentageInput from "../../../components/form/sf-percentage-input";
import SearchAssociate from "../../../components/dynamic-elements/sf-search-associate";
import useBorrowStore from "../../../core/stores/borrow-store";

export default function CreateBorrow() {
  const { 
    borrow,
    setBorrow,
    updateGuaranteeFund,
    updateInterests,
    clearBorrow
  } = useBorrowStore();
  const [periodType, setPeriodType] = useState("-");

  const handleClearBorrow = () => {
    setPeriodType("-");
    clearBorrow();
  };

  const handlePeriodType = (value: string) => {
    setPeriodType(value)
    setBorrow({ ...borrow, isFortnightly: value === "F" });
  };

  useEffect(() => {
    updateGuaranteeFund();
    updateInterests();
  }, [borrow.requestedAmount]);

  return (
    <>
    <div className="columns">
      <div className="column"></div>
      <div className="column">
        <SearchAssociate
          id="borrow_associate_name"
          name="Socio"
          value={borrow.associateId}
          readonly={true}
          onChange={(value) => setBorrow({ ...borrow, associateId: value })} />
      </div>
      <div className="column"></div>
    </div>
    <div className="columns">&nbsp;</div>
    <div className="columns">
      <div className="column">
        <h5 className="title is-5">Datos del pr&eacute;stamo</h5>
        <SFMoneyInput id="borrow_requested_borrow" name="Cantidad Solicitada"
          value={borrow.requestedAmount}
          onChange={(value) => setBorrow({ ...borrow, requestedAmount: value })} />
        <SFSelectInput id="borrow_period_type" name="Tipo de Periodo"
          value={periodType}
          options={([ { key: "-", value: "---"}, { key: "F", value: "QUINCENAL"}, { key: "M", value: "MENSUAL" }])}
          onChange={(value) => handlePeriodType(value)} />
        <SFSelectInput id="borrow_period" name="Duración"
          value={borrow.period}
          options={([ { key: 0, value: "---"}, { key: 1, value: "1 AÑO"}, { key: 2, value: "2 AÑOS"}, { key: 3, value: "3 AÑOS" } ])}
          onChange={(value) => setBorrow({ ...borrow, period: parseInt(value) })} />
      </div>
      <div className="column">
        <h5 className="title is-5">Cotizaci&oacute;n del pr&eacute;stamo</h5>
        <SFPercentageInput id="borrow_annual_rate" name="Tasa de Interés"
          min={0} max={100}
          readonly={true}
          value={borrow.annualRate}
          onChange={(value) => console.log(value)} />
        <SFMoneyInput id="borrow_interest_to_pay" name="Intereses"
          readonly={true}
          value={borrow.detail.interestToPay.toFixed(2)}
          onChange={(value) => console.log(value)} />
        <SFMoneyInput id="borrow_total_due" name="Total a Pagar"
          readonly={true}
          value={0}
          onChange={(value) => console.log(value)} />
      </div>
      <div className="column">
        <h5 className="title is-5">&nbsp;</h5>
        <SFMoneyInput id="borrow_guarantee_fund" name="Fondo de Garantía (2%)"
          readonly={true}
          value={borrow.detail.guaranteeFund.toFixed(2)} />
        <SFMoneyInput id="borrow_payment" name="Pago Quincenal o Mensual"
          readonly={true}
          value={0}
          onChange={(value) => console.log(value)} />
        <SFMoneyInput id="borrow_amount_to_deliver" name="Total a Entregar"
          readonly={true}
          value={0}
          onChange={(value) => console.log(value)} />
      </div>
    </div>
    <div className="mt-auto">
      <nav className="level">
        <div className="level-left"></div>
        <div className="level-right">
          <div className="level-item">
            <button className="button is-light">Imprimir cotizaci&oacute;n</button>
          </div>
          <div className="level-item">
            <button className="button is-light" onClick={() => handleClearBorrow()}>Limpiar</button>
          </div>
          <div className="level-item">
          <button className="button is-primary">Guardar</button>
          </div>
        </div>
      </nav>
    </div>
    </>
  );
}