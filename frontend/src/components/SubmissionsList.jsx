import { Link, useNavigate} from "react-router-dom";
import { Button } from "./Button";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
export function SubmissionList({ submissions }) {
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problem</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Runtime (ms)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {submissions.map((submission) => (
            <SubmissionCard key={submission._id} submission={submission} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
function SubmissionCard({submission}){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate=useNavigate()
  return <>  <tr className={submission.result=='Accepted'?"bg-green-100":"bg-red-100"}>
  <td className="px-6 py-4 whitespace-nowrap">
        <Link to={`/problem?id=${submission.problem._id}`} className="text-red-600 hover:underline">
          {submission.problem.title}
        </Link>
      </td>
  <td className="px-6 py-4 whitespace-nowrap">{submission.result}</td>
  <td className="px-6 py-4 whitespace-nowrap">{submission.time}</td>
  <td className="px-6 py-4 whitespace-nowrap">{submission.language}</td>
  <td className="px-6 py-4 whitespace-nowrap">{new Date(submission.submitted_at).toLocaleString()}</td>
  <td className="px-6 py-4 whitespace-nowrap">
          <Button onClick={() => setIsModalOpen(true)} className={"w-1/2"}>
            &lt;&gt;
          </Button>
        </td>
</tr>
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <pre className="bg-gray-100 p-4 rounded">{submission.code}</pre>
      </Modal>
</>
}
export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-3/4 max-w-3xl relative ">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-l font-bold">Code</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &#x2715;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}