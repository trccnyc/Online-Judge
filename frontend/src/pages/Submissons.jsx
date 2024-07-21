import {useState,useEffect} from 'react';
import { submissions } from '../services/submissions';
import { SubmissionList } from '../components/SubmissionsList';
import { useSearchParams } from 'react-router-dom';
import { problemsubmissions } from '../services/problemsubmissions';

const Submissions=()=>{
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

const [Ss, setS] = useState([])

useEffect(()=>{
fetchData()}, [])

const fetchData = async () => {
    let response;
if(id) response = await problemsubmissions(id);
else response =await submissions(); 
setS(response);
}


return (<div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center mb-8">Your Submissions</h1>
    <SubmissionList submissions={Ss} />
  </div>
)
}
export default Submissions;