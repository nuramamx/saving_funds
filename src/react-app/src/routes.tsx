import { createBrowserRouter } from 'react-router-dom';
import { SidebarParentMenu } from './components/layout/layout-app-sidebar';
import App from './App';
import CreateAssociate from './pages/saving-fund-management/associate/associate-create';
import CreateBorrow from './pages/saving-fund-management/borrow/create-borrow';
import SavingFundList from './pages/saving-fund-management/saving-fund/saving-fund-list';
import AssociateList from './pages/saving-fund-management/associate/associate-list';
import BorrowList from './pages/saving-fund-management/borrow/borrow-list';
import BorrowHistoryList from './pages/saving-fund-management/borrow/borrow-history-list';
import BorrowDebtorList from './pages/saving-fund-management/borrow/borrow-debtor-list';
import MyAccount from './pages/myaccount-management/myaccount/myaccount';
import MyAccountManagement from './pages/myaccount-management/myaccount-management';
import SavingFundManagement from './pages/saving-fund-management/saving-fund-management';

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
          { path: 'borrow/create', element: <CreateBorrow /> },
          { path: 'borrow/list', element: <BorrowList /> },
          { path: 'borrow/history', element: <BorrowHistoryList /> },
          { path: 'borrow/debtor', element: <BorrowDebtorList />},
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
  { key: 'util', name: 'Cargas Masivas', location: '/savingfund', children: [
    { key: 'associate-batch', route: '/savingfund/associate/batch', name: 'Asociados' },
    { key: 'borrow-batch', route: '/savingfund/borrow/batch', name: 'Préstamos' },
    { key: 'payment-batch', route: '/savingfund/payment/batch', name: 'Pagos' },
    { key: 'contribution-batch', route: '/savingfund/contribution/batch', name: 'Abonos' },
    { key: 'withdrawal-batch', route: '/savingfund/withdrawal/batch', name: 'Retiros' }
  ]},
  { key: 'general', name: 'General', location: '/myaccount', children: [
    { key: 'myaccount-page', route: '/myaccount/page', name: 'Mis Datos' }
  ] },
];

export { Routes, SidebarRoutes }