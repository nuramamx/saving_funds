import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import AssociatePage from './pages/associate-management/associate-page/associate-page';
import AssociateManagementPage from './pages/associate-management/associate-management';
import MyAccountPage from './pages/myaccount-management/myaccount-page/myaccount-page';
import MyAccountManagementPage from './pages/myaccount-management/myaccount-management';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "associate",
        element: <AssociateManagementPage />,
        children: [
          { path: "page", element: <AssociatePage /> }
        ]
      },
      {
        path: "myaccount",
        element: <MyAccountManagementPage />,
        children: [
          { path: "page", element: <MyAccountPage /> }
        ]
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
