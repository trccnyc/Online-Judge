import { useState } from "react";
import { login } from "../services/login";
import { BottomWarning } from "../components/Bottomwarming";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { fetchuser } from "../services/fetchuser";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user,setUser]=useRecoilState(userAtom)
  const handeSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const info = { email, password };
      const data = await login(info);
      await fetchData();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchData = async () => {
    const response = await fetchuser();
      setUser(response);
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <form
        className="bg-white border border-gray-400 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        onSubmit={handeSubmit}
      >
        <Heading label={"Login"}/>
        <InputBox onChange={(e) => setEmail(e.target.value)} type={'email'} placeholder={"example@gmail.com"} label={"Email"}/>
        <InputBox onChange={(e) => setPassword(e.target.value)} type={'password'} placeholder={"password@123"} label={"Password"}/>
        <div className="flex items-center justify-center">
        <Button >Login</Button>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </form>
    </div>
  );
};
export default Login;
