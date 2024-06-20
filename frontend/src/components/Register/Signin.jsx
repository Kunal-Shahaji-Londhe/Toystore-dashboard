import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/register', {
        ...formData,
        isAdmin: false, 
      });
      toast.success('User created successfully!');
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Error creating user:', error.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-8 shadow-md rounded-md max-w-md w-full" onSubmit={handleSignUp}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input type="text" id="name" name="name" onChange={handleInputChange} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input type="email" id="email" name="email" onChange={handleInputChange} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input type="password" id="password" name="password" onChange={handleInputChange} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">Phone</label>
          <input type="text" id="phone" name="phone" onChange={handleInputChange} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
        </div>

        <div className="flex items-center justify-center">
          <button type="submit"  className=" bg-black text-white py-2 px-6 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
