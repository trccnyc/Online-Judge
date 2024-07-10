import { useState } from "react";
import { register } from "../services/register";
import { BottomWarning } from "../components/Bottomwarming";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
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
    } catch (err) {
      console.log("Error in signup page",err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
    <form className="bg-white border border-gray-400 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handeSubmit}>
      <Heading label={"Sign Up"}/>
      <InputBox onChange={(e) => setfN(e.target.value)} type={'text'} placeholder={"First Name"} label={"First Name"}/>
      <InputBox onChange={(e) => setlN(e.target.value)} type={'text'} placeholder={"Last Name"} label={"Last Name"}/>
      <InputBox onChange={(e) => setEmail(e.target.value)} type={'email'} placeholder={"example@gmail.com"} label={"Email"}/>
      <InputBox onChange={(e) => setPassword(e.target.value)} type={'password'} placeholder={"password@123"} label={"Password"}/>
      <div className="flex items-center justify-center">
      <Button >Signup</Button>
      </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Login"} to={"/login"}></BottomWarning>
    </form>
    </div>
  );
};
export default Register;