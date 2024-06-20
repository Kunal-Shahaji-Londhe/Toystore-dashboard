import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
   <>
   <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Toy Store</h1>

        <div className="flex justify-center space-x-4">
          <Link to="/login" className="bg-white text-blue-500 py-2 px-4 rounded-full hover:bg-blue-100 focus:outline-none focus:shadow-outline-blue active:bg-blue-200">
            Login
          </Link>

          <Link to="/signin" className="bg-white text-blue-500 py-2 px-4 rounded-full hover:bg-blue-100 focus:outline-none focus:shadow-outline-blue active:bg-blue-200">
            Sign In
          </Link>
        </div>
      </div>
    </div>
    <div>
    
   </div>
   </>
  )
}

export default Home