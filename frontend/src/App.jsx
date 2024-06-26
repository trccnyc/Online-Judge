import { useState,useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import "./App.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Problemset  from './pages/Problemset.jsx';
import AddProblem from './pages/Addproblem.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Problemset" element={<Problemset />} />
          <Route path="/AddProblem" element={<AddProblem />} />

          <Route path="*" element={<h1> Page not found!</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
