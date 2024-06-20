import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import Login from '../../Login/Login';
import { toast } from 'react-toastify';

const ProfileInfoComponent = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { user, isAuthenticated, login, logout } = useAuth();


  useEffect(() => {
    toast.success('Welcome, '+ user.user.name + ' !!');
    if (user && user.user) {
      setUserInfo({
        name: user.user.name || '',
        email: user.user.email || '',
        phone: user.user.phone || '',
        street: user.user.street || '',
        apartment: user.user.apartment || '',
        city: user.user.city || '',
        zip: user.user.zip || '',
        country: user.user.country || '',
      });
    }
  }, [user]);
  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `https://ecommerceapi-2-6l87.onrender.com/api/v1/users/${user.user._id}`,
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Update user information in the context
      login(response.data);
      toast.success('Credentials Saved Succesfully!');

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleLogoutClick = () => {
    logout()
    toast.success('logged out successfully!');
    console.log('logged out successfully!')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      {isAuthenticated ? (
        <>
        <div className="max-w-2xl mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

          {Object.entries(userInfo).map(([key, value]) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={userInfo[key]}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              ) : (
                <p className="text-md text-gray-800">{userInfo[key]}</p>
              )}
            </div>
          ))}

          <div className="mt-6">
            {isEditing ? (
              <button
                className="bg-black text-white py-2 px-4 rounded hover:bg-gray-900 mr-2"
                onClick={handleSaveClick}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-primaryColor text-white py-2 px-4 rounded hover:bg-tertiaryColor mr-2"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            )}
            {/*{!isEditing && (
              <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
              onClick={handleLogoutClick}
              >
                Logout
              </button>
            )}*/}
            
          </div>

        </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default ProfileInfoComponent;
