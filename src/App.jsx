import React from 'react';
import './style/App.scss';

import {
  BrowserRouter
} from 'react-router-dom';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Routes from './Routes';

// Ant Design CSS
// import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        <SideBar />
        <div className="container">
          <Routes />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
