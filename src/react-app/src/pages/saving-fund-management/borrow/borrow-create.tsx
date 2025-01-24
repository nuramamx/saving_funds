import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { addDays, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ZodIssue } from 'zod';
import { WarningCircle } from 'iconoir-react';
import SFMoneyInput from '../../../components/form/sf-money-input';
import SFSelectInput from '../../../components/form/sf-select-input';
import SearchAssociate, { SearchAssociateForwardedMethods } from '../../../components/dynamic-elements/sf-search-associate';
import useBorrowStore from '../../../core/stores/borrow-store';
import useCacheStore from '../../../core/stores/cache-store';
import AnnualRateInfo from '../../../core/interfaces/info/annual-rates-info';
import CommandResponseInfo from '../../../core/interfaces/info/command-response-info';
import AppConstants from '../../../core/constants/app-constants';
import useValidationModalStore from '../../../core/stores/validation-modal-store';
import useNotificationStore from '../../../core/stores/notification-store';
import SFDatePickerInput from '../../../components/form/sf-datepicker-input';
import useAuthStore from '../../../core/stores/auth-store';
import IssueTransform from '../../../core/util/transforms/issue-transform';
import BorrowValidation from '../../../core/validations/borrow-validation';
import SFTextDisplayInput from '../../../components/form/sf-text-display-input';
import ToMoney from '../../../core/util/conversions/money-conversion';
import AssociateListByIdOrNameSpec from '../../../core/interfaces/specs/list/associate-list-by-id-or-name-spec';
import saveAs from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import BorrowQuoteReportPDF from './reports/borrow-quote-report-pdf';

export default function BorrowCreate() {
  const { 
    borrow,
    setBorrow,
    updateGuaranteeFund,
    updateInterests,
    updateTotalDue,
    updateNumberOfPayments,
    updateAmountToDeliver,
    clearBorrow
  } = useBorrowStore();
  const [associate, setAssociate] = useState<AssociateListByIdOrNameSpec>();
  const [periodType, setPeriodType] = useState('-');
  const [issues, setIssues] = useState<ZodIssue[]>([]);
  const navigate = useNavigate();
  const { pushNotification } = useNotificationStore();
  const { setValidationModal } = useValidationModalStore();
  const { annualRates, setAnnualRates } = useCacheStore();
  const { token, user } = useAuthStore();
  const searchAssociateRef = useRef<SearchAssociateForwardedMethods>(null);

  const fetchAnnualRates = async () => {
    const result = await fetch(`${AppConstants.apiBorrow}/rates`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const response = await result.json() as CommandResponseInfo;
    const list = response.data as AnnualRateInfo[];

    setAnnualRates(list);
  };

  const handleAssociate = (value: number, name: string, data: AssociateListByIdOrNameSpec) => {
    setBorrow({ ...borrow, associateId: value });
    setAssociate(data);
  };

  const handleClearBorrow = () => {
    setPeriodType('-');
    clearBorrow();
    setAssociate(undefined!)
    setIssues([]);

    if (searchAssociateRef.current) searchAssociateRef.current.clear();
  };

  const handlePeriodType = (value: string) => {
    if (value === '-') {
      setPeriodType(undefined!);
      setBorrow({ ...borrow, isFortnightly: undefined! });
    }
    else {
      setPeriodType(value)
      setBorrow({ ...borrow, isFortnightly: value === 'F' });
    }
  };

  const handlePeriod = (value: string) => {
    const period = parseInt(value);

    setBorrow({ ...borrow,
      period: parseInt(value),
      annualRate: annualRates.find(x => x.period === period)?.rate ?? 0
    });
  };

  const print = async () => {
    if (!handleAssociateValidate()) return;

    const blob = await pdf(<BorrowQuoteReportPDF data={{
      currentYear: new Date().getFullYear(),
      associateName: associate?.name!,
      period: borrow.period === 1 ? borrow.period + ' Año' : borrow.period + ' Años',
      isFortnightly: borrow.isFortnightly,
      requestedAmount: borrow.requestedAmount,
      numberPayments: borrow.detail.numberPayments,
      totalWithInterests: (borrow.detail.totalDue - borrow.detail.guaranteeFund),
      guaranteeFund: borrow.detail.guaranteeFund,
      totalDue: borrow.detail.totalDue,
      payment: borrow.detail.payment,
      startAt: format(borrow.startAt, 'yyyy-MM-dd'),
    }} />).toBlob();

    saveAs(blob, `Cotización de descuento por crédito - ${associate?.name}.pdf`);
  };

  const save = async () => {
    if (!handleAssociateValidate()) return;

    try {
      const response = await fetch(`${AppConstants.apiBorrow}/create`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(borrow)
      });

      if (!response.ok) {
        const error = await response.json() as CommandResponseInfo;

        return setValidationModal({
          message: error.message,
          show: true,
          errors: error.errors,
          data: error.data
        });
      }

      pushNotification({ message: 'Préstamo creado con éxito.', type: 'success' });
      handleClearBorrow();
      navigate('/savingfund/borrow/list');
    } catch (err: any) {
      pushNotification({ message: err.message, type: 'danger' });
    }
  };
  
  const handleAssociateValidate = (): boolean => {
    const result = BorrowValidation.safeParse(borrow);

    if (!result.success) {
      pushNotification({
        message: `Favor de revisar los campos requeridos.`,
        type: 'danger'
      });

      setIssues(IssueTransform('borrow', result.error.issues));      
    }

    return result.success;
  };

  useEffect(() => {
    updateGuaranteeFund();
    updateInterests(borrow.period, borrow.annualRate ?? 0);
    updateTotalDue();
    updateNumberOfPayments();
    updateAmountToDeliver();

    if (annualRates.length <= 0) fetchAnnualRates();
  }, [borrow.requestedAmount, borrow.isFortnightly, borrow.period, borrow.annualRate, setAssociate]);

  useEffect(() => {
    return () => {
      handleClearBorrow();
    };
  }, []);

  return (
    <>
    <div className="columns">
      <div className="column"></div>
      <div className="column">
        <SearchAssociate
          ref={searchAssociateRef}
          id="borrow_associate_name"
          name="Socio"
          value={borrow.associateId}
          readonly={true}
          onChange={(id, name, data) => handleAssociate(id, name, data)} />
      </div>
      <div className="column"></div>
    </div>
    <div className="has-text-centered">
      {associate?.hasActiveBorrows ? (
          <label style={{ color: '#C0392B' }}><WarningCircle style={{ color: '#C0392B' }} />&nbsp;&nbsp;El socio tiene uno o varios pr&eacute;stamos sin liquidar.</label>
        ) : '' }
      {issues.find(x => x.path.includes('associateId')) ? (
          <label style={{ color: '#C0392B' }}><WarningCircle style={{ color: '#C0392B' }} />&nbsp;&nbsp;Debe seleccionar el socio.</label>
        ) : '' }
    </div>
    <div className="columns">&nbsp;</div>
    <div className="columns">&nbsp;</div>
    <div className="columns">
      <div className="column">
        <h5 className="title is-5">Datos del pr&eacute;stamo</h5>
        <SFMoneyInput id="borrow-requestedAmount" name="Cantidad Solicitada"
          tour="<label>La cantidad que el socio desea solicitar.</label>"
          value={borrow.requestedAmount}
          onChange={(value) => setBorrow({ ...borrow, requestedAmount: value })}
          issues={issues} />
        <SFSelectInput id="borrow-isFortnightly" name="Tipo de Periodo"
          tour="Periodo quincenal o mensual."
          value={periodType}
          options={([ { key: '---', value: '-' }, { key: 'QUINCENAL', value: 'F' }, { key: 'MENSUAL', value: 'M' }])}
          onChange={(value) => handlePeriodType(value)}
          issues={issues} />
        <SFSelectInput id="borrow-period" name="Duración"
          tour="Duración del préstamo, de uno a tres años."
          value={borrow.period}
          options={([{ key: '---', value: '-' }, { key: '1 AÑO', value: 1 }, { key: '2 AÑOS', value: 2}, { key: '3 AÑOS', value: 3 } ])}
          onChange={(value) => handlePeriod(value)}
          issues={issues} />
        <SFDatePickerInput params={{
          tour: "Fecha de inicio del préstamo.",
          id: 'borrow-startAt',
          name: 'Fecha de Inicio',
          value: borrow.startAt,
          issues: issues,
          readonly: user.role === 'ADMIN' ? false : true,
          onChange: (value) => setBorrow({ ...borrow, startAt: value }),
          maxDate: addDays(new Date(), 30)
        }} />
      </div>
      <div className="column">
        <h5 className="title is-5">Cotizaci&oacute;n del pr&eacute;stamo</h5>
        <SFMoneyInput id="borrow-annualRate" name="Tasa de Interés"
          display="%"
          value={borrow.annualRate}
          onChange={(value) => setBorrow({ ...borrow, annualRate: value })}
          issues={issues} />
        <SFTextDisplayInput id="borrow-interestToPay" name="Intereses"
          display="!"
          readonly={true}
          value={ToMoney(borrow.detail.interests)} />
        <SFTextDisplayInput id="borrow-totalDue" name="Total a Pagar"
          display="!"
          readonly={true}
          value={ToMoney(borrow.detail.totalDue)} />
      </div>
      <div className="column">
        <h5 className="title is-5">&nbsp;</h5>
        <SFTextDisplayInput id="borrow-guaranteeFund" name="Fondo de Garantía (2%)"
          display="!"
          readonly={true}
          value={ToMoney(borrow.detail.guaranteeFund)} />
        <SFTextDisplayInput id="borrow-payment" name="Pago Quincenal o Mensual"
          display="!"
          readonly={true}
          value={ToMoney(borrow.detail.payment)} />
        <SFTextDisplayInput id="borrow-amountToDeliver" name="Total a Entregar"
          display="!"
          readonly={true}
          value={ToMoney(borrow.detail.amountDelivered)} />
      </div>
    </div>
    <div className="mt-auto" style={{ display: user.role === 'ADMIN' ? 'block' : 'none'}}>
      <nav className="level">
        <div className="level-left"></div>
        <div className="level-right">
          <div className="level-item">
            <button className="button is-light" onClick={() => handleClearBorrow()}>Limpiar</button>
          </div>
          <div className="level-item">
            <button className="button is-light" onClick={print}>Imprimir</button>
          </div>
          <div className="level-item">
            <button className="button is-primary" onClick={save}>Guardar</button>
          </div>
        </div>
      </nav>
    </div>
    </>
  );
}