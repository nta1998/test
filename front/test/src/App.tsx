import React from 'react';
import logo from './logo.svg';
import { Students } from './features/students/Students';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Students></Students>
      </header>
    </div>
  );
}

export default App;
