import { createBrowserRouter } from 'react-router-dom';
import { SidebarParentMenu } from './components/layout/layout-app-sidebar';
import App from './App';
import AssociateManagementPage from './pages/saving-fund-management/saving-fund-management';
import MyAccountManagementPage from './pages/myaccount-management/myaccount-management';
import MyAccountPage from './pages/myaccount-management/myaccount-page/myaccount-page';
import CreateAssociate from './pages/saving-fund-management/associate-page/create-associate';
import CreateBorrow from './pages/saving-fund-management/borrow-page/create-borrow';
import ListAssociate from './pages/saving-fund-management/associate-page/list-associate';
import ListBorrow from './pages/saving-fund-management/borrow-page/list-borrow';
import ListBorrowHistory from './pages/saving-fund-management/borrow-page/list-borrow-history';
import ListBorrowDebtor from './pages/saving-fund-management/borrow-page/list-borrow-debtor';
import SavingFundList from './pages/saving-fund-management/saving-fund-page/saving-fund-list';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'savingfunds',
        element: <AssociateManagementPage />,
        children: [
          { path: 'list', element: <SavingFundList /> },
          { path: 'associate/list', element: <ListAssociate /> },
          { path: 'associate/create', element: <CreateAssociate /> },
          { path: 'borrow/list', element: <ListBorrow /> },
          { path: 'borrow/create', element: <CreateBorrow /> },
          { path: 'borrow/history', element: <ListBorrowHistory /> },
          { path: 'borrow/debtor', element: <ListBorrowDebtor />}
        ]
      },
      {
        path: 'myaccount',
        element: <MyAccountManagementPage />,
        children: [
          { path: 'page', element: <MyAccountPage /> }
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
  { key: 'associates', name: 'Socios', location: '/savingfunds', children: [
    { key: 'associate-create', route: '/savingfunds/associate/create', name: 'Inscribir Socio' },
    { key: 'associate-list', route: '/savingfunds/associate/list', name: 'Gestión de Socios' }
  ] },
  { key: 'saving-fund', name: 'Fondos de Ahorro', location: '/savingfunds', children: [
    { key: 'saving-fund-list', route: '/savingfunds/list', name: 'Gestión de Fondos de Ahorro' }
  ] },
  { key: 'borrowing', name: 'Préstamos', location: '/savingfunds', children: [
    { key: 'borrow-create', route: '/savingfunds/borrow/create', name: 'Inscribir Préstamo' },
    { key: 'borrow-list', route: '/savingfunds/borrow/list', name: 'Gestión de Préstamos' },
    { key: 'borrow-history', route: '/savingfunds/borrow/history', name: 'Historial de Préstamos' },
    { key: 'borrow-debtor', route: '/savingfunds/borrow/debtor', name: 'Socios Deudores' }
  ] },
  { key: 'util', name: 'Cargas Masivas', location: '/savingfunds', children: [
    { key: 'associate-batch', route: '/savingfunds/associate/batch', name: 'Asociados' },
    { key: 'borrow-batch', route: '/savingfunds/borrow/batch', name: 'Préstamos' },
    { key: 'payment-batch', route: '/savingfunds/payment/batch', name: 'Pagos' },
    { key: 'contribution-batch', route: '/savingfunds/contribution/batch', name: 'Abonos' },
    { key: 'withdrawal-batch', route: '/savingfunds/withdrawal/batch', name: 'Retiros' }
  ]},
  { key: 'general', name: 'General', location: '/myaccount', children: [
    { key: 'myaccount-page', route: '/myaccount/page', name: 'Mis Datos' }
  ] },
];

export { Routes, SidebarRoutes }