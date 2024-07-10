import axios from "axios";

export async function fetchuser(){
    try{
    const res=await axios.get('http://localhost:3000/user',{withCredentials:true});
    return res.data;
    }catch(err){
        console.log(err.message);
    }
}