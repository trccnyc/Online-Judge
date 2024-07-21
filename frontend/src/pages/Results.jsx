import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Standings=()=>{
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
  
  const [result, setR] = useState({
  results:[]
  })
  
  useEffect(()=>{
    fetchData()}, [])
    
    const fetchData = async () => {
        const response = await axios.get(`http://localhost:3000/contest/results/${id}`,{withCredentials: true});
        console.log('asdasd',response.data);
    setR(response.data.result);
    }
  
  
  return <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
  <h1 className="text-3xl font-bold text-center mb-8">Standing</h1>
  <div className="bg-white shadow-md rounded-xl p-6 w-3/4">
    <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
      <thead className="bg-yellow-400">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">#</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">User</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Score</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {result.results.map((pos, index) => {
          return <tr key={pos._id} className="hover:bg-gray-100 cursor-pointer"  >
            <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{pos.user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{pos.totalscore}</td>
          </tr>
})}
      </tbody>
    </table>
  </div>
</div>
  }
  export default Standings;