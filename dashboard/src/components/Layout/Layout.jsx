import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from '../Auth/Login/Login';
import Signin from '../Auth/Login/Signin/Signin';
import Dashboard from '../Dashboard/Dashboard';
import Products from '../Products/Products';
import Orders from '../Orders/Orders';
import Settings from '../Settings/Settings';
import Users from '../Users/Users';
import Addproduct from '../Products/Addproduct/Addproduct';
import AddCategory from '../Categories/AddCategory';
import Categories from '../Categories/Categories';
import DiscountComponent from '../Discounts/Discount';
import Reviews from '../Reviews/Reviews';


function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const lacation = useLocation();

  const isActive = (path) => location.pathname === path;
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
     
      { isAuthenticated ? (
        <div className='flex h-screen'>
         {/* left sidebar */}
        <div
        className={`p-4 w-[15%] min-h-screen bg-black text-white rounded-md ${
          isSidebarOpen ? 'sidebar-open' : ''
        }`}
      >
        <div className='flex items-center cursor-pointer' onClick={toggleSidebar}>
          {/*<svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M19 9l-7 7-7-7'
            />
          </svg>*/}
          <h1 className='pl-2 pb-8 text-xl font-semibold'>StoreAdmin</h1>
        </div>

        <NavLink to={'/'} className={`flex pl-3 p-3 ${isActive('/') ? 'bg-white text-black rounded-md' : ''}`}  activeClassName='active'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
          </svg>
          <h1>Dashboard</h1>
        </NavLink>

        <NavLink to={'/orders'} className={`flex pl-3 p-3 ${isActive('/orders') ? 'bg-white text-black rounded-md' : ''}`} activeClassName='active'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 0h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <h1>Orders</h1>
        </NavLink>

        <NavLink to={'/products'} className={`flex pl-3 p-3 ${isActive('/products') ? 'bg-white text-black rounded-md' : ''}`} activeClassName='active'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <h1>Products</h1>
        </NavLink>

        <NavLink to={'/category'} className={`flex pl-3 p-3 ${isActive('/category') ? 'bg-white text-black rounded-md' : ''}`} activeClassName='active'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
        </svg>

          <h1>Category</h1>
        </NavLink>

        <NavLink to={'/users'} className={`flex pl-3 p-3 ${isActive('/users') ? 'bg-white text-black rounded-md' : ''}`} activeClassName='active'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <h1>Customers</h1>
        </NavLink>

        <NavLink to={'/discount'} className={`flex pl-3 p-3 ${isActive('/discount') ? 'bg-white text-black rounded-md' : ''}`} activeClassName='active'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>

          <h1>Discounts</h1>
        </NavLink>

       {/*  <NavLink to={'/reviews'} className={`flex pl-3 p-3 ${isActive('/reviews') ? 'bg-white text-black rounded-md' : ''}`} activeClassName='active'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
          <h1>Reviews</h1>
        </NavLink>*/}

      </div>
      <div className='bg-gray-100 w-[85%] rounded-lg'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/layout' element={<Layout />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/products' element={<Products />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/users' element={<Users />} />
            <Route path='/category' element={<Categories />} />
            <Route path='/addproduct' element={<Addproduct />} />
            <Route path='/addcategory' element={<AddCategory />} />
            <Route path='/discount' element={<DiscountComponent />} />
            <Route path='/reviews' element={<Reviews />} />
        </Routes>
      </div>
      </div>
      ) : <Login setIsAuthenticated={setIsAuthenticated}/>}

     </>
    
  );
}

export default Layout;
