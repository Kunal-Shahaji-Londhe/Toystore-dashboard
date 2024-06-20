import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/context';

const Reviews = () => {
    const [productReviews, setProductReviews] = useState([]);
    const { selectedProductId, productName, productImage } = useAppContext();
    const productId = selectedProductId;

    useEffect(() => {
        const fetchProductReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/reviews/${productId}/reviews`);
                setProductReviews(response.data);
            } catch (error) {
                console.error('Error fetching product reviews:', error);
            }
        };

        fetchProductReviews();
    }, [productId]);

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='bg-white rounded-lg shadow-md overflow-hidden mb-8'>
                <div className='flex items-center justify-between p-4'>
                    <div className='flex items-center'>
                        <img src={productImage} className='w-12 h-12 rounded-md mr-4' alt='product' />
                        <h1 className='text-xl font-bold'>{productName}</h1>
                    </div>
                    <p className='text-sm text-gray-500'>Total Reviews : {productReviews.length}</p>
                </div>
            </div>
            <h2 className='text-lg font-semibold mb-4'>Reviews</h2>
            <div className='grid gap-6'>
                {productReviews.map((review, index) => (
                    <div key={review._id} className='bg-white rounded-lg shadow-md overflow-hidden'>
                        <div className='p-6'>
                            <p className='text-gray-600 mb-2'>Review #{index + 1}</p>
                            <h2 className='text-lg font-semibold mb-2'>Reviewer: {review.user.name}</h2>
                            <p className='text-gray-600 mb-2'>Rating: {review.rating}</p>
                            <p className='text-gray-700'>{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
            {productReviews.length === 0 && (
                <p className='text-center mt-8 text-gray-600'>No reviews available for this product.</p>
            )}
        </div>
    );
};

export default Reviews;
