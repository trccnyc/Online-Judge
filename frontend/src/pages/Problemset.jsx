import {useState,useEffect} from 'react';
import { Problems} from "../components/Problems";
const Problemset=()=>{
const [Ps, setP] = useState([])

useEffect(()=>{
fetchData()}, [])

const fetchData = async () => {
const response = await fetch("http://localhost:3000/problemset");
const json = await response.json();
console.log(json);
setP(json);
}


return (
<div>
    <h1>awkskuihf</h1>
<Problems problems={Ps}/>
</div>
)
}
export default Problemset;