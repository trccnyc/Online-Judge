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
    <div className="flex items-center justify-center min-h-screen bg-green-100">
    <form className="bg-white border border-gray-400 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handeSubmit}>
      <h1 className="text-2xl font-bold mb-6 text-center">Sign up</h1>
      <div className="mb-4 ">
      <label className="block text-gray-700 text-sm font-bold mb-2">First Name :</label>
      <input
        type="text"
        value={firstName}
        placeholder="First Name"
        onChange={(e) => setfN(e.target.value)}
        required
        className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      </div>
      <div className="mb-4 ">
      <label className="block text-gray-700 text-sm font-bold mb-2">Last Name :</label>
      <input
        type="text"
        value={lastName}
        placeholder="Last Name"
        onChange={(e) => setlN(e.target.value)}
        required
        className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      </div>
      <div className="mb-4 ">
      <label className="block text-gray-700 text-sm font-bold mb-2">Email :</label>
      <input
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        required
        className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      </div>
      <div className="mb-6 ">
      <label className="block text-gray-700 text-sm font-bold mb-2">Password :</label>
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        required
        className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      </div>
      <div className="flex items-center justify-center">
          <button className="w-1/3 text-center mt-2 bg-gradient-to-br from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5">
            Sign Up
          </button>
        </div>
    </form>
    </div>
  );
};
export default Register;