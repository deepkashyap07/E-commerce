import  { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onsubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin" , {email, password}) 
      if(response.data.success){
        setToken(response.data.token);
      }  
      else{
        toast.error(response.data.message);
      }        
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="bg-white shadow-md rounded-lg max-w-md px-8 py-6">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onsubmit}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2 ">
              Email address
            </p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2 ">Password</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
