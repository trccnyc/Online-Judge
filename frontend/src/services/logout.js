import axios from 'axios';
const SERVER=import.meta.env.VITE_BACKEND_URL

export const logout=async()=>{
    try{
        const response= await axios.get(`${SERVER}/logout`,{withCredentials: true})
        console.log(response);
        return response.data;
    }
    catch(err){
        console.log("Error in axios post /login",err);
    }
}