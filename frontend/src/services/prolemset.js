import axios from "axios";
const SERVER=import.meta.env.VITE_BACKEND_URL

export async function problemset(){
    try{
        const responce = await axios.get(`${SERVER}/problemset`,{withCredentials: true});
          return responce.data;
      }
      catch(err){
          console.log("Error in axios Post /register",err);
      }
}