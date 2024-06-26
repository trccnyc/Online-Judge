import axios from 'axios';
const API_URL="http://localhost:3000"

export const register=async(data)=>{
    try{
        const responce= await axios.post(`${API_URL}/register`,data)
        return responce.data;
    }
    catch(err){
        console.log("Error in axios Post /register",err);
    }
}