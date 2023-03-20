import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Threads from './components/Threads';

function App() {

  return (
    <div className="App">
      <NavBar/>
        <Threads className="threads"/>
    </div>
  );
}

export default App;
