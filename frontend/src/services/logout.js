import axios from 'axios';
const API_URL="http://localhost:3000";

export const logout=async()=>{
    try{
        const response= await axios.get(`${API_URL}/logout`,{withCredentials: true})
        console.log(response);
        return response.data;
    }
    catch(err){
        console.log("Error in axios post /login",err);
    }
}