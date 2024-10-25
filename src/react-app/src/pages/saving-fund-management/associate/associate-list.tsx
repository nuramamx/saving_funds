import { useEffect, useState } from 'react'
import { objectToCamel } from 'ts-case-convert';
import { Edit } from 'iconoir-react';
import { Link } from 'react-router-dom';
import AppConstants from '../../../core/constants/app-constants';
import ToMoney from '../../../core/util/conversions/money-conversion';
import CommandResponseInfo from '../../../core/interfaces/info/command-response-info';
import AssociateListSpec from '../../../core/interfaces/specs/list/associate-list-spec';
import SFPagination from '../../../components/dynamic-elements/sf-pagination';
import StatementReportActionItem from './action-items/statement-report-action-item';
import useAuthStore from '../../../core/stores/auth-store';
import SearchAssociate from '../../../components/dynamic-elements/sf-search-associate';
import AssociateListQuery from '../../../core/interfaces/query/associate-list-query';
import AssociateDeleteActionItem from './action-items/associate-delete-action-item';
import RefreshActionButton from '../../../components/action-buttons/refresh-action-button';

export default function AssociateList() {
  const [associates, setAssociates] = useState<AssociateListSpec[]>([]);
  const [associate, setAssociate] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { token } = useAuthStore();

  const fetchAssociates = async (page: number) => {
    const result = await fetch(`${AppConstants.apiAssociate}/list`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        associateId: associate ?? 0,
        page: page
      } as AssociateListQuery)
    });

    if (!result.ok)
      throw new Error(result.statusText);

    const response = await result.json() as CommandResponseInfo;
    const list = objectToCamel(response.data) as AssociateListSpec[];
    
    setTotalPages(Math.ceil((response.totalRows ?? 0) / 20));
    setAssociates(list);
  };

  const handlePagination = async (currentPage: number) => {
    setPage(currentPage);
    await fetchAssociates(currentPage);
  };

  useEffect(() => {
    fetchAssociates(page);
  }, [page]);

  const handleReload = async () => {
    await fetchAssociates(page);
  }

  useEffect(() => {
    handleReload();
  }, [associate]);

  return (
    <>
    <div className='is-flex is-flex-direction-column' style={{ height: 'auto'}}>
      <div className="columns">
        <div className="column"></div>
        <div className="column">
          <SearchAssociate
            id="borrow_associate_name"
            name="Socio"
            value={associate}
            readonly={true}
            onChange={(value) => setAssociate(value)} />
        </div>
        <div className="column"></div>
      </div>
      <div className="columns">
        <div className="column" data-tg-tour="Listado de socios actuales en el sistema.">
          <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
            <thead>
              <tr key={1}>
                <th>Id</th>
                <th>RFC</th>
                <th>Nombre</th>
                <th>Direcci&oacute;n</th>
                <th>Categor&iacute;a</th>
                <th>Convenio</th>
                <th>Sueldo / Pensi&oacute;n</th>
                <th data-tg-tour="Es la aportación que realiza el socio a su fondo de ahorro, puede ser quincenal o mensual.">Aportaci&oacute;n Frecuente</th>
                <th>Estatus</th>
                <th data-tg-tour="Acciones a realizar: Estado de cuenta, Editar o Inactivar socio.">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {associates !== undefined && associates?.length > 0 ? (
                associates.map((associate: AssociateListSpec) => (
                <tr key={associate.id}>
                  <td>{associate.id}</td>
                  <td>{associate.rfc}</td>
                  <td>{associate.name}</td>
                  <td className='truncate-200' title={associate.address}>{associate.address}</td>
                  <td>{associate.category}</td>
                  <td>{associate.agreementName}</td>
                  <td>{ToMoney(associate.salary)}</td>
                  <td>{ToMoney(associate.frequentContribution)}</td>
                  <td>{associate.isActive ? 'ACTIVO' : 'INACTIVO'}</td>
                  <td>
                    <StatementReportActionItem associateName={associate.name.toUpperCase()} associateId={associate.id} />
                    <Link to={`/savingfund/associate/composer/${associate.id}`} style={{ color: 'inherit' }}><button><Edit style={{ color: 'currentcolor' }} /></button></Link>
                    <AssociateDeleteActionItem associateId={associate.id} onComplete={() => handleReload()} />
                  </td>
                </tr>
              ))) : (
                <tr>
                  <td colSpan={10} style={{textAlign: 'center'}}>No hay socios disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bottom-content-container">
        <SFPagination currentPage={page} totalPages={totalPages} onChange={(v) => handlePagination(v)} />
      </div>
      <div className="bottom-content-container">
        <RefreshActionButton onClick={() => handlePagination(page)} />
      </div>
    </div>
    </>
  )
}