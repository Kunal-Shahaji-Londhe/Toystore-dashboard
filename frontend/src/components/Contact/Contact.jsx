import React from 'react'

function Contact() {
  return (
    <>
        <div className='flex justify-center items-center bg-white min-h-screen overflow-hidden'>
          <div className='flex justify-center items-center'>
            <form className='login-form rounded-xl p-4 lg:grid lg:grid-rows-3 lg:pr-40'>
                <div className='flex justify-center items-center bg-white lg:text-3xl text-3xl font-extrabold lg:mr-28 mb-10'>
                  <h1>Contact Us!</h1>
                </div>
              <div className='mb-5'>
                <label htmlFor='username' className='font-normal'>First name</label>
                <input
                  type='text'
                  placeholder=''
                  className='border-2 border-gray-200 p-3 mt-3 rounded w-full lg:w-[175%]'
                />
              </div>
              <div className='mb-5'>
                <label htmlFor='username' className='font-normal'>Last name</label>
                <input
                  type='text'
                  placeholder=''
                  className='border-2 border-gray-200 p-3 mt-3 rounded w-full lg:w-[175%]'
                />
              </div>
              <div className='mb-5'>
                <label htmlFor='username' className='font-normal'>Email</label>
                <input
                  type='text'
                  placeholder=''
                  className='border-2 border-gray-200 p-3 mt-3 rounded w-full lg:w-[175%]'
                />
              </div>
              <div className='mb-5'>
                <label htmlFor='text' className='font-normal'>Your Query</label>
                <textarea
                  type='text'
                  placeholder=''
                  className='resize-none border-2 border-gray-200 p-3 mt-3 rounded w-full lg:w-[175%] lg:h-[100px] h-[100px]'
                />
              </div>
              <div className='mb-5'>
                <button className='mt-5 text-white bg-primaryColor hover:bg-primaryColor p-3 rounded-3xl w-full lg:w-[175%]'>
                  Submit
                </button>
              </div>
            </form>
          </div>
      </div>
    </>
  )
}

export default Contact;