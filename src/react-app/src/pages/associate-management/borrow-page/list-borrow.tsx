import { useEffect, useState } from 'react'
import { objectToCamel } from 'ts-case-convert';
import AppConstants from '../../../core/constants/app-constants';
import CommandResponseInfo from '../../../core/interfaces/command-response-info';
import ListBorrowSpec from '../../../core/interfaces/specs/list/list-borrow-spec';
import TypeFormat from '../../../core/util/type-format';

export default function ListBorrow() {
  const [borrows, setBorrows] = useState<ListBorrowSpec[]>([]);

  useEffect(() => {
    const fetchBorrows = async () => {
      const result = await fetch(`${AppConstants.apiBorrow}/list`, {
        method: 'GET'
      });

      const response = await result.json() as CommandResponseInfo;
      const list = objectToCamel(JSON.parse(response.data)) as ListBorrowSpec[];
      
      setBorrows(list);
    };

    fetchBorrows();
  }, []);

  return (
    <div className="columns">
      <div className="column">
        <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Socio</th>
              <th>Monto Solicitado</th>
              <th>Total a Pagar</th>
              <th>Total pagado</th>
              <th>Periodo</th>
              <th>Periodicidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {borrows !== undefined && borrows?.length > 0 ? (
              borrows.map((borrow: ListBorrowSpec) => (
              <tr key={borrow.id}>
                <td>{borrow.id}</td>
                <td>{borrow.associateName}</td>
                <td>{TypeFormat.toCurrency(borrow.requestedAmount)}</td>
                <td>{TypeFormat.toCurrency(borrow.totalDue)}</td>
                <td>{TypeFormat.toCurrency(borrow.totalPaid)}</td>
                <td>{borrow.period} {borrow.period > 1 ? 'AÑOS' : 'AÑO'}</td>
                <td>{borrow.isFortnightly ? 'QUINCENAL' : 'MENSUAL'}</td>
                <td>
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan={8} style={{textAlign: 'center'}}>No hay pr&eacute;stamos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}