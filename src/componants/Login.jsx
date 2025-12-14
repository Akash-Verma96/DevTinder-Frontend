import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("akash@gmail.com");
    const [password, setPassword] = useState("Akash@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async () =>{
        try {
            const res = await axios.post(
              BASE_URL + "/login",
            {
                emailId,
                password,
            },
            {withCredentials : true}
          );
          dispatch(addUser(res.data));

          return navigate("/");
        } catch (error) {
            setError(error?.response?.data);
        }
    }

  return (
    <div className="w-full flex justify-center mt-30">
      <div className="w-full max-w-sm  rounded-2xl  p-6 bg-black shadow-lg shadow-cyan-500/50 inset-shadow-sm inset-shadow-cyan-500 ...">
        
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="you@example.com"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot?
            </a>
          </div>
          <p className="text-red-500 mb-3" >{error}</p>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"  onClick={handleLogin} >
            Sign In
          </button>
        

        <p className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account?
          <a href="#" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
