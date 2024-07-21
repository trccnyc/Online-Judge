import { Link } from "react-router-dom";
import { userAtom } from "../atoms/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { logout } from "../services/logout";
import { login } from "../services/login";
import { fetchuser } from "../services/fetchuser";
const Navbar=()=>{
  const [user,setUser]=useRecoilState(userAtom);
  console.log(user);
  async function logoutHandler(){
   await logout();
   const data=fetchuser();
   setUser(data);
  }
    return (
      <nav className="bg-gradient-to-br from-blue-500 to-green-400 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold mr-8">ONLINE-JUDGE</div>
          <div className="flex space-x-4">
            <Link to="/problemset" className="text-white px-4 py-2 rounded-md hover:bg-blue-500">
              Problemset
            </Link>
            {user.admin&&(
            <Link to="/addproblem" className="text-white px-4 py-2 rounded-md hover:bg-blue-500">
              Add Problem
            </Link>
          )}
           {user.success&&(
            <>
             <Link to="/contests" className="text-white px-4 py-2 rounded-md hover:bg-blue-500">
             Contests
            </Link>
            <Link to="/submissions" className="text-white px-4 py-2 rounded-md hover:bg-blue-500">
             Submissions
            </Link>
            <p className="text-white px-4 py-2 rounded-md">{user.email} </p>
            <button onClick={logoutHandler} className="text-black px-4 py-2 bg-gray-200 rounded-md hover:bg-blue-500">Logout</button>
            </>
           )
           }
           {!user.success&&(<>
           <Link to="/login" className="text-white px-4 py-2 rounded-md hover:bg-blue-500">
           Login
         </Link>
          <Link to="/signup" className="text-white px-4 py-2 rounded-md hover:bg-blue-500">
          Signup
        </Link>
        </>
           )
           }
          </div>
        </div>
      </nav>
    );
  }
  export default Navbar;