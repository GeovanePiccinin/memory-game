import React from 'react';
import './App.css';
import GamePanel from './components/GamePanel';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <GamePanel />
    </div>
  );
}

export default App;
