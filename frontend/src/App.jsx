
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import "./App.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Problemset  from './pages/Problemset.jsx';
import AddProblem from './pages/Addproblem.jsx';
import Compiler from './pages/CompilerPage.jsx';
import Problem from './pages/Problem.jsx';
import Navbar from "./components/Navbar.jsx";
function App() {
  return (
    <div className="App">
          <Navbar></Navbar>
      
      <Router>
        <Routes>
          <Route path="/" element={<Compiler />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Problemset" element={<Problemset />} />
          <Route path="/AddProblem" element={<AddProblem />} />
          <Route path="/Compiler" element={<Compiler />} />
          <Route path="/Problem" element={<Problem />} />
          <Route path="*" element={<h1> Page not found!</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
