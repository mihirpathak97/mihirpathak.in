import React from 'react';
import './style/App.scss';

import {
  BrowserRouter
} from 'react-router-dom';
import SideBar from './components/SideBar';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
