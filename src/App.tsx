import React from 'react';
import './App.css';
import Clock from './Clock';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>hello, react + typescript</p>
      </header>
      <div>
        <Clock />
      </div>
    </div>
  );
}

export default App;