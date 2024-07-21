import axios from 'axios';

const SERVER=import.meta.env.VITE_BACKEND_URL

export const addproblem=async(data)=>{
    try{
        const responce= await axios.post(`${SERVER}/addproblem`,data,{ withCredentials: true });
        return responce.data;
    }
    catch(err){
        console.log("Error in axios post /addproblem",err);
    }
}