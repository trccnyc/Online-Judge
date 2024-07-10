import axios from 'axios';
const API_URL="http://localhost:3000"

export const run=async(payload)=>{
    try{
      const responce = await axios.post('http://localhost:3000/compiler/run', payload,{withCredentials: true});
        return responce.data;
    }
    catch(err){
        console.log("Error in axios Post /register",err);
    }
}