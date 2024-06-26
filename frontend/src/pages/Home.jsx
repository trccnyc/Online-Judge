import { Link } from "react-router-dom";
const Home=()=>{
    return (
      <div className="container">
        <Link to="/">
          <h1>Login or Signup to continue</h1>
        </Link>
        <nav>
            <div>
              <a href='/Login'> <button >Login</button></a>
              <a href='/Signup'> <button >Signup</button></a>
            </div>
        </nav>
      </div>
    )
}
export default Home