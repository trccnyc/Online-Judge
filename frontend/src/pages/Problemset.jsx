import {useState,useEffect} from 'react';
import { Problems} from "../components/Problems";
const Problemset=()=>{
const [Ps, setP] = useState([])

useEffect(()=>{
fetchData()}, [])

const fetchData = async () => {
    const token =localStorage.token;
const response = await fetch("http://localhost:3000/problemset",{headers: {
    'token': token}
});
const json = await response.json();
console.log(json);
setP(json);
}


return (
<Problems problems={Ps}/>

)
}
export default Problemset;