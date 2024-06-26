import axios from 'axios';
const API_URL="http://localhost:3000"

export const login=async(data)=>{
    try{
        const responce= await axios.post(`${API_URL}/login`,data)
        return responce.data;
    }
    catch(err){
        console.log("Error in axios post /login",err);
    }
}