import { useState } from "react";
import { register } from "../services/register";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfN] = useState("");
  const [lastName, setlN] = useState("");

  const handeSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(firstName,lastName,email, password);
      const info = { firstName,lastName,email, password};
      const data = await register(info);
      console.log("Signup result :", data);
    } catch (err) {
      console.log("Error in signup page",err);
    }
  };
  return (
    <form className="signup" onSubmit={handeSubmit}>
      <h1>Sign up</h1>
      <label>First Name :</label>
      <input
        type="text"
        value={firstName}
        placeholder="First Name"
        onChange={(e) => setfN(e.target.value)}
        required
      />
      <br></br>
      <label>Last Name :</label>
      <input
        type="text"
        value={lastName}
        placeholder="Last Name"
        onChange={(e) => setlN(e.target.value)}
        required
      />
      <br></br>
      <label>Email :</label>
      <input
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br></br>
      <label>Password :</label>
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br></br>
      <button>Sign up</button>
    </form>
  );
};
export default Register;