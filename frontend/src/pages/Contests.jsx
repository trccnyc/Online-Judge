import axios from 'axios';
import { format } from 'date-fns';
import {useState,useEffect} from 'react';

import { Link, useNavigate } from 'react-router-dom';
 const Contestset=()=>{
const [Cs, setC] = useState([])

useEffect(()=>{
fetchData()}, [])

const fetchData = async () => {
    const response = await axios.get('http://localhost:3000/contest',{withCredentials: true});
    console.log('asdasd',response.data.contests);
setC(response.data.contests);
}


return ( <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center mb-8">Contest</h1>
    <Contests contests={Cs} />
  </div>
)
}
function Contests({ contests }) {
    return (
        <div className="container mx-auto p-4">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-green-100">
              <tr>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contests.map((contest,index) => (
                <ContestCard key={contest._id} contest={contest} index={index+1} />
              ))}
            </tbody>
          </table>
        </div>
    );
  }
  function ContestCard({contest,index}){
    const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/contest?id=${contest._id}`);
  };
    return <>  
    <tr onClick={handleRowClick} className="hover:bg-gray-100" >
    <td className="px-6 py-4 whitespace-nowrap">{index}</td>
    <td className="px-6 py-4 whitespace-nowrap">{contest.title}</td>
    <td className="px-6 py-4 whitespace-nowrap">{format(new Date(contest.starttime), "yyyy-MM-dd HH:mm")}</td>
    <td className="px-6 py-4 whitespace-nowrap">{format(new Date(contest.endtime), "yyyy-MM-dd HH:mm")}</td>
    </tr>
  </>
  }
export default Contestset;