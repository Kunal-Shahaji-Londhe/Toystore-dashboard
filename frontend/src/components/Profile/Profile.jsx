import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../Login/Login';
import MyPurchaseComponent from './Purchase/MyPurchaseComponent';
import ProfileInfoComponent from './ProfileInfoComponent/ProfileInfoComponent';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, isAuthenticated, logout } = useAuth();

  const notify = () => {
    toast("Logged out Successfully!")
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleLogoutClick = () => {
    logout();
    notify();
    console.log('Logged out successfully!');
  };

  return (
    <>
        {isAuthenticated? (
            <>
                <div className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="flex justify-between items-center bg-gray-200 px-4 py-3">
                        <h2 className="text-xl font-semibold">Account</h2>
                        <div className="flex space-x-4">
                            <button
                            className={`text-gray-600 ${activeTab === 'profile' ? 'font-semibold' : ''}`}
                            onClick={() => handleTabChange('profile')}
                            >
                            Profile
                            </button>
                            <button
                            className={`text-gray-600 ${activeTab === 'myPurchases' ? 'font-semibold' : ''}`}
                            onClick={() => handleTabChange('myPurchases')}
                            >
                            My Purchases
                            </button>
                        </div>
                        </div>

                        <div className="p-4">
                        {activeTab === 'profile' && <ProfileInfoComponent user={user} />}
                        {activeTab === 'myPurchases' && <MyPurchaseComponent userId={user.user._id} />}
                        </div>

                        <div className="bg-gray-200 px-4 py-3 flex justify-end">
                        <button
                            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                            onClick={handleLogoutClick}
                        >
                            Logout
                        </button>
                        </div>
                    </div>

                    <ToastContainer position="top-right" />
                </div>
            </>      
            ) : (
                <Login />
            )
        }
        </>
  );
};

export default Profile;
