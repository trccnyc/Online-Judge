import axios from "axios";
export async function fetchproblem(id){
    try{
        const responce = await axios.get(`http://localhost:3000/problemset/${id}`,{withCredentials: true});
          return responce.data;
      }
      catch(err){
          console.log("Error in axios Post /register",err);
      }
}