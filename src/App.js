import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Threads from './components/Threads';

function App() {

  return (
    <div className="App">
      <header>
        <NavBar/>
      </header>
      <section>
        <Threads className="threads"/>
      </section>
    </div>
  );
}

export default App;
