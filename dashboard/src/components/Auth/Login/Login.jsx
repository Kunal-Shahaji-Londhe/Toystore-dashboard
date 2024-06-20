import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signin from './Signin/Signin';
import { Button } from '@/components/ui/button';

const Login = ({ setIsAuthenticated }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [clickSignIn, setClickedSignIn] = useState(false);

  const navigate = useNavigate();
  const notify = (Loggedin) => {if(Loggedin) toast("Login Succesful!")};


  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/login', loginData);

      console.log('Login successful:', response.data);
      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem('token', token);
      const Loggedin = true;
      notify(Loggedin)
      // Assume the login is successful for demonstration purposes
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  const handleSignin = () => {
    setClickedSignIn(true);
  }

  return (
    <>
    {
      !clickSignIn ? (
        <div className="flex justify-center items-center h-screen">
    <form className="bg-white p-8 shadow-md rounded-md max-w-md w-full" onSubmit={handleLogin}>
      <h2 className="text-3xl font-semibold mb-6 text-center text-black">Toy Store Admin Login</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleInputChange}
          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="flex items-center justify-center">
        <Button
          type="submit"
          className=" text-white py-2 px-6 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Log In
        </Button>
      </div>

      <div className="mt-4 text-center">
        {/* Redirect to SignUpForm component */}
        <Link onClick={handleSignin} className="text-black hover:underline">
          Don't have an account? Sign Up
        </Link>
      </div>

      <ToastContainer position="bottom-right" />
    </form>
     
  </div>
      ) : ( <Signin/>)
    }
    </>
  );
};

export default Login;
