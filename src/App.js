import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import { Home } from './components/home';
import { NavBar } from './components/NavBar'
import { MusicEditor } from './components/musicEditor';

function App() {
  return (
    // <React.Fragment>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<MusicEditor />} />
        {/* <Route path="playground" element={<MusicEditor />} /> */}
      </Routes>
    </div>

    // </React.Fragment>
  );
}

export default App;
