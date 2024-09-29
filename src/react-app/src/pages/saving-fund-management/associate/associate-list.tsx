import { useEffect, useState } from 'react'
import { objectToCamel } from 'ts-case-convert';
import { BinMinusIn, Edit } from 'iconoir-react';
import AppConstants from '../../../core/constants/app-constants';
import ToMoney from '../../../core/util/conversions/money-conversion';
import CommandResponseInfo from '../../../core/interfaces/info/command-response-info';
import AssociateListSpec from '../../../core/interfaces/specs/list/associate-list-spec';
import SFPagination from '../../../components/dynamic-elements/sf-pagination';
import StatementReportActionItem from './action-items/statement-report-action-item';
import { Link } from 'react-router-dom';

export default function AssociateList() {
  const [associates, setAssociates] = useState<AssociateListSpec[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalRows, setTotalRows] = useState<number>(0);

  const fetchAssociates = async (page: number) => {
    const result = await fetch(`${AppConstants.apiAssociate}/list?page=${page}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}` }
    });

    if (!result.ok)
      throw new Error(result.statusText);

    const response = await result.json() as CommandResponseInfo;
    const list = objectToCamel(response.data) as AssociateListSpec[];
    
    setTotalRows(response.totalRows ?? 0);
    setTotalPages(Math.ceil((response.totalRows ?? 0) / 10));
    setAssociates(list);
  };

  const handlePagination = (currentPage: number) => {
    console.log(currentPage);
  };

  useEffect(() => {
    fetchAssociates(page);
  }, [page]);

  return (
    <>
    <div className="is-flex-grow-1">
      <div className="columns content-section">
        <div className="column table-container">
          <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
            <thead>
              <tr key={1}>
                <th>Id</th>
                <th>Nombre</th>
                <th>Direcci&oacute;n</th>
                <th>Clave de Dependencia</th>
                <th>Categor&iacute;a</th>
                <th>Convenio</th>
                <th>Salario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {associates !== undefined && associates?.length > 0 ? (
                associates.map((associate: AssociateListSpec) => (
                <tr key={associate.id}>
                  <td>{associate.id}</td>
                  <td>{associate.name}</td>
                  <td className='truncate-200' title={associate.address}>{associate.address}</td>
                  <td>{associate.dependencyKey}</td>
                  <td>{associate.category}</td>
                  <td>{associate.agreementName}</td>
                  <td>{ToMoney(associate.salary)}</td>
                  <td>
                    <StatementReportActionItem associateName={associate.name.toUpperCase()} associateId={associate.id} />
                    <Link to={`/savingfund/associate/composer/${associate.id}`} style={{ color: 'inherit' }}><button><Edit style={{ color: 'currentcolor' }} /></button></Link>&nbsp;&nbsp;
                    <button><BinMinusIn /></button>
                  </td>
                </tr>
              ))) : (
                <tr>
                  <td colSpan={8} style={{textAlign: 'center'}}>No hay socios disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="bottom-content-container">
      <SFPagination currentPage={page} totalPages={totalPages} onChange={(v) => handlePagination(v)} />
    </div>
    </>
  )
}