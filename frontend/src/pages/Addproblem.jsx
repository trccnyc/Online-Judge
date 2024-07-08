import {useState,useEffect} from 'react';
import {addproblem} from '../services/addproblem';
const AddProblem=()=>{
    const [file,setFile]=useState(null);
    const handleSubmit=async (e)=>{
        e.preventDefault();
        let jsonData ={};
        try{
            if (file && file.type === "application/json") {
                const reader = new FileReader();
          
                reader.onload = async (e) => {
                  try {
                     jsonData = JSON.parse(e.target.result);
                     console.log(jsonData);
                    const data=await addproblem(jsonData);
                    console.log("Add Problem Result :", data);
                  } catch (err) {
                    console.error('Error parsing JSON:', err);
                  }
                };
          
                reader.onerror = () => {
                  console.log("Error reading file");
                };
          
                reader.readAsText(file);
              }
              
        }
        catch(err){
            console.log("Error in Addproblem.jsx",err);
        }
        
    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <form className="bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-6 text-center">Add a problem</h1>
            <div className='md-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Upload JSON File:
          </label>
            <input type='file' accept="application/json" onChange={(e) => setFile(e.target.files[0])}
        required className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:shadow-outline" ></input>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/3 text-center mt-2 bg-gradient-to-br from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Submit
          </button>
        </div>
        </form>
        </div>
    )
}
export default AddProblem;