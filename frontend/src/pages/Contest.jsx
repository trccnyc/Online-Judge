import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
const SERVER=import.meta.env.VITE_BACKEND_URL 

const Contest=()=>{
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [statusMessage, setStatusMessage] = useState("");
    const [contest,setC]=useState({
        title:'Loading...',
        description:'Loading...',
        problems:[],
        starttime:new Date(),
        endtime:new Date(),
    });
    
    useEffect(()=>{
    fetchData()}, [])
    const fetchData = async () => {
        const response = await axios.get(`${SERVER}/${id}`,{withCredentials: true});
        console.log('awsdas',response.data);
        setC(response.data.contest);
    }
    
    return <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
    <div className="bg-white shadow-md rounded-xl p-6 w-3/4 mb-8">
      <h1 className="text-4xl font-bold text-center mb-4">{contest.title}</h1>
      <p className="text-center mb-4">
        <span className="font-semibold">Description:</span> {contest.description}
      </p>
      <p className="text-center mb-4">
        <span className="font-semibold">Start Time:</span> {new Date(contest.starttime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      </p>
      <p className="text-center mb-4">
        <span className="font-semibold">End Time:</span> {new Date(contest.endtime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      </p>
      <p ><Timer startTime={new Date(contest.starttime)} endTime={new Date(contest.endtime)}></Timer></p>
      <div className="flex justify-center space-x-4">
        <Link to={`/standing?id=${contest._id}`} className="text-center mt-2 bg-gradient-to-br from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 rounded">
          View Standings
        </Link>
      </div>
    </div>

    <div className="bg-white shadow-md rounded-xl p-6 w-3/4">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-yellow-400">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Score</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contest.problems.map((problem, index) => {

            const handleRowClick = () => {
              navigate(`/problem?id=${problem.problem._id}&contestID=${contest._id}`);}
            return <tr key={problem.id} className="hover:bg-gray-100 cursor-pointer" onClick={handleRowClick} >
              <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{problem.problem.title}</td>
              <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{problem.maxscore}</td>
            </tr>
})}
        </tbody>
      </table>
    </div>
  </div>
}
const Timer = ({ startTime, endTime }) => {
    const [statusMessage, setStatusMessage] = useState("");
  

  useEffect(() => {
    const updateStatusMessage = () => {
      const currentTime = new Date();


      if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
        setStatusMessage("Invalid contest time");
        return;
      }

      if (currentTime > endTime) {
        setStatusMessage("Contest Ended");
      } else if (currentTime < startTime) {
        const timeLeft = new Date(startTime - currentTime).toISOString().substr(11, 8);
        setStatusMessage(`Contest starts in: ${timeLeft}`);
      } else {
        const timeLeft = new Date(endTime - currentTime).toISOString().substr(11, 8);
        setStatusMessage(`Time left: ${timeLeft}`);
      }
    };

    updateStatusMessage();
    const intervalId = setInterval(updateStatusMessage, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, endTime]);
  
  
    return <p className="text-center text-red-500 mb-4">{statusMessage}</p>;
  };
  export default Contest;