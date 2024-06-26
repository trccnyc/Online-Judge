import {useState} from 'react';
import {addproblem} from '../services/addproblem';
const AddProblem=()=>{
    const [file,setFile]=useState({});
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            console.log(file);
            const send=await addproblem(file);
            console.log(send); 
        }
        catch(err){
            console.log("Error in Addproblem.jsx",err);
        }
    }
    return (
        <form className='addproblem' onSubmit={handleSubmit}>
            <h1>Add a problem</h1>
            <input type='file' accept="application/json" onChange={(e) => setFile(e.target.files[0])}
        required></input>
             <button>Submit</button>
        </form>
    )
}
export default AddProblem;