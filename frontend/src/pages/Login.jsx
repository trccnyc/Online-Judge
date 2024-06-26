import { useState } from "react";
import { login } from "../services/login";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handeSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const info = { email, password };
      const data = await login(info);
      console.log("Login Result :", data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="login" onSubmit={handeSubmit}>
      <h1>Login</h1>
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
      <button>Login</button>
    </form>
  );
};
export default Login;
