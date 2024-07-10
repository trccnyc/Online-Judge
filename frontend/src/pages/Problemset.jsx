import {useState,useEffect} from 'react';
import { Problems} from "../components/ProblemNavigate";
import { problemset } from '../services/prolemset';
const Problemset=()=>{
const [Ps, setP] = useState([])

useEffect(()=>{
fetchData()}, [])

const fetchData = async () => {
const response = await problemset();
setP(response);
}


return ( <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center mb-8">Problem Set</h1>
    <Problems problems={Ps} />
  </div>
)
}
export default Problemset;