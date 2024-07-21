import axios from "axios";
const SERVER=import.meta.env.VITE_BACKEND_URL

export async function problemsubmissions(id){
    try{
        console.log(id);
        const responce = await axios.get(`${SERVER}/submissions/${id}`,{withCredentials: true});
        console.log(responce.data)
          return responce.data;
      }
      catch(err){
          console.log("Error in axios Post /register",err);
      }
}