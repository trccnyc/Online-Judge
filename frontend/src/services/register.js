import axios from 'axios';
const SERVER=import.meta.env.VITE_BACKEND_URL

export const register=async(info)=>{
    try{
        const responce= await axios.post(`${SERVER}/register`,info)
        return responce.data;
    }
    catch(err){
        console.log("Error in axios Post /register",err);
    }
}