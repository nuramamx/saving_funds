import { createBrowserRouter } from 'react-router-dom';
import { SidebarParentMenu } from './components/layout/layout-app-sidebar';
import App from './App';
import AssociateManagementPage from './pages/associate-management/associate-management';
import MyAccountManagementPage from './pages/myaccount-management/myaccount-management';
import MyAccountPage from './pages/myaccount-management/myaccount-page/myaccount-page';
import CreateAssociate from './pages/associate-management/associate-page/create-associate';
import CreateBorrow from './pages/associate-management/borrow-page/create-borrow';
import ListAssociate from './pages/associate-management/associate-page/list-associate';
import ListBorrow from './pages/associate-management/borrow-page/list-borrow';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'associate',
        element: <AssociateManagementPage />,
        children: [
          { path: 'list', element: <ListAssociate /> },
          { path: 'create', element: <CreateAssociate /> },
          { path: 'borrow/list', element: <ListBorrow /> },
          { path: 'borrow/create', element: <CreateBorrow /> },
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
  { key: 'associates', name: 'Socios', location: '/associate', children: [
    { key: 'associate-create', route: '/associate/create', name: 'Inscribir Socio' },
    { key: 'associate-list', route: '/associate/list', name: 'Gestión de Socios' }
  ] },
  { key: 'borrowing', name: 'Préstamos', location: '/associate', children: [
    { key: 'borrow-create', route: '/associate/borrow/create', name: 'Inscribir Préstamo' },
    { key: 'borrow-list', route: '/associate/borrow/list', name: 'Gestión de Préstamos' },
    { key: 'borrow-history', route: '/associate//borrow/history', name: 'Historial de Préstamos' },
    { key: 'borrow-associate-debtors', route: '/associate//borrow/page', name: 'Socios Deudores' }
  ] },
  { key: 'payments', name: 'Pagos', location: '/associate', children: [
  { key: 'payment-register', route: '/associate/payment/create', name: 'Registrar Pago' },
  { key: 'payment-list', route: '/associate/payment', name: 'Gestión de Pagos' }
] },
  // { name: 'Retiros', location: '/associate', children: [
  //     { route: '/withdrawal/page', name: 'Gestión de Retiros' },
  //     { route: '/withdrawal/page', name: 'Ver Retiros' }
  // ] },
  { key: 'general', name: 'General', location: '/myaccount', children: [
    { key: 'myaccount-page', route: '/myaccount/page', name: 'Mis Datos' }
  ] },
];

export { Routes, SidebarRoutes }