import React from 'react';
import { Startup } from './components/Startup';
import './css/app.css';
import logo from './assets/duckduck.png';
import Logo from './components/Logo';

const App: React.FC = () => {
  return (
    <div className="App">
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Logo src={logo} alt="DuckDuckGo Logo" />
      </div>
      <h1 style={{ textAlign:'center' }}>DuckDuckGo Search</h1>
      <Startup />
    </div>
  );
}

export default App;
