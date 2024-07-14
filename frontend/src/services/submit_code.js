import axios from 'axios';
const API_URL="http://localhost:3000"

export const submit=async(payload,id)=>{
    try{
      const responce = await axios.post(`http://localhost:3000/compiler/${id}`, payload,{withCredentials: true});
      console.log(responce.data)
        return responce.data;
    }
    catch(err){
        console.log("Error in axios Post /register",err);
    }
}