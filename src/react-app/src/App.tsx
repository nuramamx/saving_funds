import React from 'react';
import logo from './logo.svg';
import './App.css';
import AssociatePage from './pages/associate-management/associate-page';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AssociatePage />
      </header>
    </div>
  );
}

export default App;
