import axios from 'axios';
const SERVER=import.meta.env.VITE_BACKEND_URL

export const run=async(payload)=>{
    try{
      const responce = await axios.post(`${SERVER}/compiler/run`, payload,{withCredentials: true});
      console.log(responce.data);
        return responce.data;
    }
    catch(err){
        console.log("Error in axios Post /register",err);
    }
}