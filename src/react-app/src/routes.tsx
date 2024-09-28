import { createBrowserRouter } from 'react-router-dom';
import { SidebarParentMenu } from './components/layout/layout-app-sidebar';
import App from './App';
import SavingFundList from './pages/saving-fund-management/saving-fund/saving-fund-list';
import AssociateList from './pages/saving-fund-management/associate/associate-list';
import BorrowHistoryList from './pages/saving-fund-management/borrow/borrow-history-list';
import BorrowDebtorList from './pages/saving-fund-management/borrow/borrow-debtor-list';
import SavingFundManagement from './pages/saving-fund-management/saving-fund-management';
import SystemManagement from './pages/system-management/system-management';
import BorrowCreate from './pages/saving-fund-management/borrow/borrow-create';
import BatchUpload from './pages/saving-fund-management/batch/batch-upload';
import SavingFundAnnualRateList from './pages/system-management/saving-fund-annual-rate/saving-fund-annual-rate-list';
import BorrowAnnualRateList from './pages/system-management/borrow-annual-rate/borrow-annual-rate-list';
import ProtectedRoute from './components/security/protected-content';
import Login from './pages/login/login';
import { AssociateComposer, associateComposerLoader } from './pages/saving-fund-management/associate/associate-composer';

const Routes = createBrowserRouter([
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'savingfund',
        element: <SavingFundManagement />,
        children: [
          { path: 'list', element: <ProtectedRoute><SavingFundList /></ProtectedRoute> },
          { path: 'associate/composer/:id?', element: <ProtectedRoute><AssociateComposer /></ProtectedRoute>, loader: associateComposerLoader },
          { path: 'associate/list', element: <ProtectedRoute><AssociateList /></ProtectedRoute> },
          { path: 'borrow/create', element: <ProtectedRoute><BorrowCreate /></ProtectedRoute> },
          { path: 'borrow/list', element: <ProtectedRoute><BorrowHistoryList /></ProtectedRoute> },
          { path: 'borrow/debtor', element: <ProtectedRoute><BorrowDebtorList /></ProtectedRoute> },
          { path: 'batch/upload', element: <ProtectedRoute><BatchUpload /></ProtectedRoute> },
        ]
      },
      {
        path: 'system',
        element: <SystemManagement />,
        children: [
          // { path: 'batch/composer', element: <BatchComposer /> },
          // { path: 'batch/list', element: <BatchList /> },
          { path: 'annualrate/savingfund/list', element: <ProtectedRoute><SavingFundAnnualRateList /></ProtectedRoute> },
          { path: 'annualrate/borrow/list', element: <ProtectedRoute><BorrowAnnualRateList /></ProtectedRoute> }
        ]
      },
      // {
      //   path: 'myaccount',
      //   element: <MyAccountManagement />,
      //   children: [
      //     { path: 'page', element: <MyAccount /> }
      //   ]
      // },
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
    { key: 'associate-composer', route: '/savingfund/associate/composer', name: 'Inscribir Socio' },
    { key: 'associate-list', route: '/savingfund/associate/list', name: 'Gestión de Socios' }
  ] },
  { key: 'saving-fund', name: 'Fondos de Ahorro', location: '/savingfund', children: [
    { key: 'saving-fund-list', route: '/savingfund/list', name: 'Gestión de Fondos de Ahorro' }
  ] },
  { key: 'borrowing', name: 'Préstamos', location: '/savingfund', children: [
    { key: 'borrow-create', route: '/savingfund/borrow/create', name: 'Inscribir Préstamo' },
    // { key: 'borrow-list', route: '/savingfund/borrow/list', name: 'Gestión de Préstamos' },
    { key: 'borrow-history-list', route: '/savingfund/borrow/list', name: 'Gestión de Préstamos' },
    { key: 'borrow-debtor-list', route: '/savingfund/borrow/debtor', name: 'Socios Deudores' }
  ] },
  { key: 'util', name: 'Utilidades', location: '/savingfund', children: [
    { key: 'batch-upload', route: '/savingfund/batch/upload', name: 'Carga por Batch' }
  ]},
  // { key: 'batch', name: 'Batch', location: '/system', children: [
  //   { key: 'batch-composer', route: '/system/batch/composer', name: 'Crear Batch' },
  //   { key: 'batch-list', route: '/system/batch/list', name: 'Gestión de Batchs' }
  // ] },
  { key: 'annual-rate', name: 'Interés Anual', location: '/system', children: [
    { key: 'saving-fund-annual-rate-list', route: '/system/annualrate/savingfund/list', name: 'Fondo de Ahorro' },
    { key: 'borrow-annual-rate-list', route: '/system/annualrate/borrow/list', name: 'Préstamos' }
  ] },
  // { key: 'general', name: 'General', location: '/myaccount', children: [
  //   { key: 'myaccount-page', route: '/myaccount/page', name: 'Mis Datos' }
  // ] },
];

export { Routes, SidebarRoutes }