import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CgProfile } from "react-icons/cg";
import pfp from '../../assets/category/pfp.jpg';
import './Review.scss';

function Review() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0); // Add state for rating
  const { user, isAuthenticated, token } = useAuth(); // Access token from AuthContext
  const { id } = useParams();
  const user_id = isAuthenticated ? user.user._id : null;

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/reviews/${id}/reviews`, {
        headers: {
          Authorization: `Bearer ${token}` // Include bearer token in the request headers
        }
      });
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id, token]);

  const handleReviewSubmit = async () => {
    try {
      if (!isAuthenticated) {
        toast.error('Please log in to submit a review');
        return;
      }

      if (!newReview.trim() || rating === 0) {
        toast.error('Please enter a review and rating');
        return;
      }

      // Make a POST request to submit the review
      await axios.post(`http://localhost:3000/api/v1/reviews`, {
        userId: user_id,
        productId: id,
        rating: rating,
        comment: newReview
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Include bearer token in the request headers
        }
      });

      toast.success('Review submitted successfully');
      setNewReview('');
      setRating(0); // Reset rating
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    }
  };

  return (
    <>
      <div className='my-[32px] lg:my-[40px] h-[1px] lg:h-[0px] w-[100%] bg-gray-200' />
      <div className='heading'>
        <h1 className='mt-8 lg:mt-20 text-[18px] lg:text-[24px]'>CUSTOMER REVIEWS</h1>
        <div className='mt-[5px] lg:mt-[10px] w-[50px] h-[3px] bg-primaryColor' />
      </div>
      <div className=''>
        {isAuthenticated && (
          <div className='bg-white border-2 border-gray-200 p-5 rounded-xl mt-8 lg:w-[75%] lg:h-[100%]'>
            <div className=''>
              <div className='flex items-center'>
                <CgProfile className='w-[35px] h-[35px] rounded-full border-2 border-primaryColor' />
                <h3 className='p-3 font-bold text-lg'>Your Review</h3>
              </div>
              <textarea
                placeholder='Write your own review!'
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className='resize-none w-[100%] h-[100px] border-2 border-black rounded-lg p-2 mb-4 lg:w-[90%] lg:h-[150px]'
              />
              <div className='flex items-center'>
                {[...Array(5)].map((_, index) => (
                  <svg key={index} className={`w-8 h-8 cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`} fill='currentColor' viewBox='0 0 20 20' onClick={() => setRating(index + 1)}>
                    <path fillRule='evenodd' d='M10 1l2.46 6.73H18l-5.01 3.95 1.96 6.27L10 14.73 5.05 17.95l1.96-6.27L2 7.73h5.54L10 1z' clipRule='evenodd' />
                  </svg>
                ))}
              </div>
              <button
                type='submit'
                onClick={handleReviewSubmit}
                className='rounded-md bg-gray-200 hover:bg-gray-300 px-3 lg:px-5 py-1.5 mt-4 text-md'
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className='bg-white border-2 border-gray-200 p-5 rounded-xl mt-8 lg:w-[75%] lg:h-[100%]'>
              <div className=''>
                <div className='flex items-center'>
                  <CgProfile className='w-[35px] h-[35px] rounded-full border-2 border-primaryColor' />
                  <h3 className='p-3 font-bold text-lg'>{review.user.name}</h3>
                </div>
                <div className='flex items-center'>
                  {[...Array(review.rating)].map((_, index) => (
                    <svg key={index} className='w-6 h-6 text-yellow-500' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M10 1l2.46 6.73H18l-5.01 3.95 1.96 6.27L10 14.73 5.05 17.95l1.96-6.27L2 7.73h5.54L10 1z' clipRule='evenodd' />
                    </svg>
                  ))}
                  {[...Array(5 - review.rating)].map((_, index) => (
                    <svg key={index} className='w-6 h-6 text-gray-300' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M10 1l2.46 6.73H18l-5.01 3.95 1.96 6.27L10 14.73 5.05 17.95l1.96-6.27L2 7.73h5.54L10 1z' clipRule='evenodd' />
                    </svg>
                  ))}
                </div>
                <p className='text-gray-400 pt-3 p-7'>{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center mt-8 lg:mt-12 text-gray-600'>No reviews available for this product</p>
        )}
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}

export default Review;
