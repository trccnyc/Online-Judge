import axios from "axios";
const SERVER=import.meta.env.VITE_BACKEND_URL

export async function fetchuser(){
    try{
        console.log('userurl',SERVER);
    const res=await axios.get(`${SERVER}/user`,{withCredentials:true});
    return res.data;
    }catch(err){
        console.log('sqaxwqs',err.message);
    }
}