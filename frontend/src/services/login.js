import axios from 'axios';
const SERVER=import.meta.env.VITE_BACKEND_URL

export const login=async(info)=>{
    try{
        console.log(SERVER,info)
        const response= await axios.post(`${SERVER}/login`,info,{withCredentials: true})
        console.log(response);
        return response.data;
    }
    catch(err){
        console.log("Error in axios post /login",err);
    }
}