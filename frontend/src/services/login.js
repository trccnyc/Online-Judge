import axios from 'axios';
const API_URL="http://localhost:3000"

export const login=async(info)=>{
    try{
        const response= await axios.post(`${API_URL}/login`,info,{withCredentials: true})
        console.log(response);
        return response.data;
    }
    catch(err){
        console.log("Error in axios post /login",err);
    }
}