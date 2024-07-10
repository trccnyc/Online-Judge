import axios from "axios";
export async function problemset(){
    try{
        const responce = await axios.get('http://localhost:3000/problemset',{withCredentials: true});
          return responce.data;
      }
      catch(err){
          console.log("Error in axios Post /register",err);
      }
}