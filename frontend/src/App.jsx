
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import "./App.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Problemset  from './pages/Problemset.jsx';
import AddProblem from './pages/Addproblem.jsx';
import Compiler from './pages/CompilerPage.jsx';
import Submissions from './pages/Submissons.jsx';
import Problem from './pages/Problem.jsx';
import Navbar from "./components/Navbar.jsx";
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from './atoms/userAtom.js';
import { useEffect } from 'react';
import { fetchuser } from './services/fetchuser.js';
import Contestset from './pages/Contests.jsx';
import Contest from './pages/Contest.jsx';
import Standings from './pages/Results.jsx';

function App() {
  const [user,setUser]=useRecoilState(userAtom);
  useEffect(()=>{
    fetchUser();
  },[])
  async function fetchUser(){
    const response = await fetchuser();
      setUser(response);
  }
  return (
    <div className="App">
      <Router>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={user.success?<Compiler />:<Login />} />
          <Route path="/Login" element={!user.success?<Login />:<Problemset/>} />
          <Route path="/Signup" element={!user.success?<Signup />:<Problemset/>} />
          <Route path="/Problemset" element={user.success?<Problemset />:<Login />} />
          <Route path='/Submissions' element={user.success?<Submissions />:<Login />}/>
          <Route path="/AddProblem" element={user.admin?<AddProblem />:<h1>Not authorized to add problem</h1>} />
          <Route path="/Problem" element={user.success?<Problem />:<Login />} />
          <Route path="/Contests" element={user.success?<Contestset />:<Login />} />
          <Route path="/Contest" element={user.success?<Contest />:<Login />} />
          <Route path="/Standing" element={user.success?<Standings />:<Login />} />
          <Route path="*" element={<h1> Page not found!</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
