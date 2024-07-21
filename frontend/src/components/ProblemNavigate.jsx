import { useNavigate} from "react-router-dom";
import { Button } from "./Button";
import { useSearchParams } from "react-router-dom";
export function Problems({ problems }) {
  return (
    <div className="container mx-auto p-4">
      {problems.map((problem) => (
        <ProblemCard key={problem._id} problem={problem} />
      ))}
    </div>
  );
}
function ProblemCard({problem}){
  const navigate=useNavigate();
  return <div  className="max-w-4xl mx-auto flex justify-between items-center border border-gray-500 rounded-lg p-4 mb-4 shadow-lg">
          <h2 className="text-xl font-bold">{problem.title}</h2>
          
            <Button className="w-1/6" onClick={(e)=>{navigate('/problem?id='+problem._id)}}>Solve</Button>
          
        </div>
}
