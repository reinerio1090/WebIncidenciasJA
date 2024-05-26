import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import Home from './Pages/Home/home';



function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
      </Routes>
    </Router>
        </>
    
  );
}

export default App
