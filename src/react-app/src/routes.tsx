import { createBrowserRouter } from 'react-router-dom';
import { SidebarParentMenu } from './components/layout/layout-app-sidebar';
import App from './App';
import CreateAssociate from './pages/saving-fund-management/associate/associate-create';
import SavingFundList from './pages/saving-fund-management/saving-fund/saving-fund-list';
import AssociateList from './pages/saving-fund-management/associate/associate-list';
import BorrowList from './pages/saving-fund-management/borrow/borrow-list';
import BorrowHistoryList from './pages/saving-fund-management/borrow/borrow-history-list';
import BorrowDebtorList from './pages/saving-fund-management/borrow/borrow-debtor-list';
import MyAccount from './pages/myaccount-management/myaccount/myaccount';
import MyAccountManagement from './pages/myaccount-management/myaccount-management';
import SavingFundManagement from './pages/saving-fund-management/saving-fund-management';
import BatchList from './pages/system-management/batch/batch-list';
import SystemManagement from './pages/system-management/system-management';
import BorrowCreate from './pages/saving-fund-management/borrow/borrow-create';
import BatchComposer from './pages/system-management/batch/batch-composer';
import BatchUpload from './pages/saving-fund-management/batch/batch-upload';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'savingfund',
        element: <SavingFundManagement />,
        children: [
          { path: 'list', element: <SavingFundList /> },
          { path: 'associate/create', element: <CreateAssociate /> },
          { path: 'associate/list', element: <AssociateList /> },
          { path: 'borrow/create', element: <BorrowCreate /> },
          { path: 'borrow/list', element: <BorrowList /> },
          { path: 'borrow/history', element: <BorrowHistoryList /> },
          { path: 'borrow/debtor', element: <BorrowDebtorList />},
          { path: 'batch/upload', element: <BatchUpload />},
        ]
      },
      {
        path: 'system',
        element: <SystemManagement />,
        children: [
          { path: 'batch/composer', element: <BatchComposer /> },
          { path: 'batch/list', element: <BatchList /> }
        ]
      },
      {
        path: 'myaccount',
        element: <MyAccountManagement />,
        children: [
          { path: 'page', element: <MyAccount /> }
        ]
      },
    ],
  },
]);

const SidebarRoutes: SidebarParentMenu[] = [
  { key: 'graphs', name: 'Gráficas', location: '/', children: [
    { key: 'graph-1', route: '/graph/1', name: 'Gráfica de X' },
    { key: 'graph-2', route: '/graph/2', name: 'Gráfica de Y' },
  ] },
  { key: 'reports', name: 'Reportes', location: '/', children: [
    { key: 'report-1', route: '/report/1', name: 'Reporte de X' },
    { key: 'report-2', route: '/report/2', name: 'Reporte de Y' },
  ] },
  { key: 'associates', name: 'Socios', location: '/savingfund', children: [
    { key: 'associate-create', route: '/savingfund/associate/create', name: 'Inscribir Socio' },
    { key: 'associate-list', route: '/savingfund/associate/list', name: 'Gestión de Socios' }
  ] },
  { key: 'saving-fund', name: 'Fondos de Ahorro', location: '/savingfund', children: [
    { key: 'saving-fund-list', route: '/savingfund/list', name: 'Gestión de Fondos de Ahorro' }
  ] },
  { key: 'borrowing', name: 'Préstamos', location: '/savingfund', children: [
    { key: 'borrow-create', route: '/savingfund/borrow/create', name: 'Inscribir Préstamo' },
    { key: 'borrow-list', route: '/savingfund/borrow/list', name: 'Gestión de Préstamos' },
    { key: 'borrow-history-list', route: '/savingfund/borrow/history', name: 'Historial de Préstamos' },
    { key: 'borrow-debtor-list', route: '/savingfund/borrow/debtor', name: 'Socios Deudores' }
  ] },
  { key: 'util', name: 'Utilidades', location: '/savingfund', children: [
    { key: 'batch-upload', route: '/savingfund/batch/upload', name: 'Carga por Batch' }
  ]},
  { key: 'batch', name: 'Batch', location: '/system', children: [
    { key: 'batch-composer', route: '/system/batch/composer', name: 'Crear Batch' },
    { key: 'batch-list', route: '/system/batch/list', name: 'Gestión de Batchs' }
  ] },
  { key: 'agreement', name: 'Convenios', location: '/system', children: [
    { key: 'agreement-create', route: '/system/agreement/create', name: 'Crear Convenio' },
    { key: 'agreement-list', route: '/system/agreement/list', name: 'Gestión de Convenios' }
  ] },
  { key: 'annual-rate', name: 'Interés Anual', location: '/system', children: [
    { key: 'saving-fund-annual-rate-list', route: '/system/annualrate/savingfund/list', name: 'Fondo de Ahorro' },
    { key: 'borrow-annual-rate-list', route: '/system/annualrate/borrow/list', name: 'Préstamos' }
  ] },
  { key: 'general', name: 'General', location: '/myaccount', children: [
    { key: 'myaccount-page', route: '/myaccount/page', name: 'Mis Datos' }
  ] },
];

export { Routes, SidebarRoutes }