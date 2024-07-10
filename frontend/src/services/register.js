import axios from 'axios';
const API_URL="http://localhost:3000"

export const register=async(info)=>{
    try{
        const responce= await axios.post(`${API_URL}/register`,info)
        return responce.data;
    }
    catch(err){
        console.log("Error in axios Post /register",err);
    }
}