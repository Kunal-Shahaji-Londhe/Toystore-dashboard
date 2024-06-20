import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import prod from '../../../public/vite.svg';
import { useNavigate } from 'react-router-dom';

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API
    fetch('http://localhost:3000/api/v1/users', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFiN2VmNGI3M2EwOTVlMzEzMWQxN2MiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTAxNjkzOTIsImV4cCI6MTcxMDI1NTc5Mn0.PFUQ53gxHKnQhbz6FE_VL6gvajdTbMU6eC51Yvvzt5o', // Replace with your actual access token
      },
    })
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <div className='bg-white m-6 p-3.5 rounded-md flex relative'>
        <h1 className='m-1 font-semibold text-xl'>Customer Tab</h1>
        {/*<Button
          className='h-9 absolute right-3 bottom-2'
          onClick={() => navigate('/addcustomer')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 m-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Add Customer
        </Button>*/}
      </div>

      <div className='bg-white m-6 h-[600px] rounded-md'>
        <div className='bg-white m-6 rounded-md'>
          <h1 className='m-5 font-semibold p-3 text-xl'>Customer List</h1>
          <div className='bg-black text-white font-semibold grid grid-cols-7 gap-2 p-4 rounded-md'>
            <h1 className='col-span-1 text-center'>Index</h1>
            <h1 className='col-span-1'>Customer name</h1>
            <h1 className='col-span-1'>Address</h1>
            <h1 className='col-span-1'>City</h1>
            <h1 className='col-span-1'>Country</h1>
            <h1 className='col-span-1'>Phone</h1>
            <h1 className='col-span-1'>Email</h1>
          </div>

          {users.map((user, index) => (
            <div key={user._id} className='bg-white border-2 border-gray-200 grid grid-cols-7 gap-2 p-4 mt-2 rounded-md items-center'>
              <span className='col-span-1 text-center'>{index + 1}</span>
              <span className='col-span-1'>{user.name}</span>
              <span className='col-span-1'>{user.street}, {user.apartment}</span>
              <span className='col-span-1'>{user.city}</span>
              <span className='col-span-1'>{user.country}</span>
              <span className='col-span-1 whitespace-nowrap'>{user.phone}</span>
              <span className='col-span-1 whitespace-nowrap'>{user.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;
