import { useEffect, useState } from 'react'
import { objectToCamel } from 'ts-case-convert';
import { BinMinusIn, Edit, JournalPage } from 'iconoir-react';
import AppConstants from '../../../core/constants/app-constants';
import ListAssociateSpec from '../../../core/interfaces/specs/list/list-associate-spec';
import ToMoney from '../../../core/util/conversions/money-conversion';
import CommandResponseInfo from '../../../core/interfaces/info/command-response-info';

export default function ListAssociate() {
  const [associates, setAssociates] = useState<ListAssociateSpec[]>([]);

  const fetchAssociates = async () => {
    const result = await fetch(`${AppConstants.apiAssociate}/list`, {
      method: 'GET'
    });

    if (!result.ok)
      throw new Error(result.statusText);

    const response = await result.json() as CommandResponseInfo;
    const list = objectToCamel(response.data) as ListAssociateSpec[];
    
    setAssociates(list);
  };

  useEffect(() => {
    fetchAssociates();
  }, []);

  return (
    <div className="columns">
      <div className="column">
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
              associates.map((associate: ListAssociateSpec) => (
              <tr key={associate.id}>
                <td>{associate.id}</td>
                <td>{associate.fullname}</td>
                <td className='truncate-200' title={associate.address}>{associate.address}</td>
                <td>{associate.dependencyKey}</td>
                <td>{associate.category}</td>
                <td>{associate.agreementName}</td>
                <td>{ToMoney(associate.salary)}</td>
                <td>
                  <button><Edit /></button>&nbsp;&nbsp;
                  <button><JournalPage /></button>&nbsp;&nbsp;
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
  )
}