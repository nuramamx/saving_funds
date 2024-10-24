import { createBrowserRouter } from 'react-router-dom';
import { SidebarParentMenu } from './components/layout/layout-app-sidebar';
import { AssociateComposer, associateComposerLoader } from './pages/saving-fund-management/associate/associate-composer';
import App from './App';
import SavingFundList from './pages/saving-fund-management/saving-fund/saving-fund-list';
import AssociateList from './pages/saving-fund-management/associate/associate-list';
import BorrowDebtorList from './pages/saving-fund-management/borrow/borrow-debtor-list';
import SavingFundManagement from './pages/saving-fund-management/saving-fund-management';
import SystemManagement from './pages/system-management/system-management';
import BorrowCreate from './pages/saving-fund-management/borrow/borrow-create';
import BorrowList from './pages/saving-fund-management/borrow/borrow-list';
import BatchUpload from './pages/saving-fund-management/batch/batch-upload';
import SavingFundAnnualRateList from './pages/system-management/saving-fund-annual-rate/saving-fund-annual-rate-list';
import BorrowAnnualRateList from './pages/system-management/borrow-annual-rate/borrow-annual-rate-list';
import ProtectedRoute from './components/security/protected-content';
import Login from './pages/login/login';

const Routes = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      {
        path: 'savingfund',
        element: <ProtectedRoute><SavingFundManagement /></ProtectedRoute>,
        children: [
          { path: 'list', element: <ProtectedRoute><SavingFundList /></ProtectedRoute> },
          { path: 'associate/composer/:id?', element: <ProtectedRoute><AssociateComposer /></ProtectedRoute>, loader: associateComposerLoader },
          { path: 'associate/list', element: <ProtectedRoute><AssociateList /></ProtectedRoute> },
          { path: 'borrow/create', element: <ProtectedRoute><BorrowCreate /></ProtectedRoute> },
          { path: 'borrow/list', element: <ProtectedRoute><BorrowList /></ProtectedRoute> },
          { path: 'borrow/debtor', element: <ProtectedRoute><BorrowDebtorList /></ProtectedRoute> },
          { path: 'batch/upload', element: <ProtectedRoute><BatchUpload /></ProtectedRoute> },
        ]
      },
      {
        path: 'system',
        element: <ProtectedRoute><SystemManagement /></ProtectedRoute>,
        children: [
          { path: 'annualrate/savingfund/list', element: <ProtectedRoute><SavingFundAnnualRateList /></ProtectedRoute> },
          { path: 'annualrate/borrow/list', element: <ProtectedRoute><BorrowAnnualRateList /></ProtectedRoute> }
        ]
      }
    ]
  }
], { basename: '/setepidsf' });

const SidebarRoutes: SidebarParentMenu[] = [
  { key: 'associates', name: 'Socios', location: '/savingfund', children: [
    { key: 'associate-composer', route: '/savingfund/associate/composer', name: 'Inscribir Socio' },
    { key: 'associate-list', route: '/savingfund/associate/list', name: 'Gestión de Socios' }
  ] },
  { key: 'saving-fund', name: 'Fondos de Ahorro', location: '/savingfund', children: [
    { key: 'saving-fund-list', route: '/savingfund/list', name: 'Gestión de Fondos de Ahorro' }
  ] },
  { key: 'borrowing', name: 'Préstamos', location: '/savingfund', children: [
    { key: 'borrow-create', route: '/savingfund/borrow/create', name: 'Inscribir Préstamo' },
    { key: 'borrow-list', route: '/savingfund/borrow/list', name: 'Gestión de Préstamos' },
    { key: 'borrow-debtor-list', route: '/savingfund/borrow/debtor', name: 'Socios Deudores' }
  ] },
  { key: 'util', name: 'Utilidades', location: '/savingfund', children: [
    { key: 'batch-upload', route: '/savingfund/batch/upload', name: 'Carga por Batch' }
  ]},
  { key: 'annual-rate', name: 'Interés Anual', location: '/system', children: [
    { key: 'saving-fund-annual-rate-list', route: '/system/annualrate/savingfund/list', name: 'Fondo de Ahorro' },
    { key: 'borrow-annual-rate-list', route: '/system/annualrate/borrow/list', name: 'Préstamos' }
  ] }
];

export { Routes, SidebarRoutes }