import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/context';
import { useContext } from 'react';
import Reviews from '../Reviews/Reviews';


function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const {storeProductId} = useAppContext();
  //const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    // Fetch products from API
    fetch('https://ecommerceapi-2-6l87.onrender.com/api/v1/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleViewReviews = (productId,productName,productImage) => {
    storeProductId(productId,productName,[productImage]);
    navigate('/reviews')
  };

  return (
    <div>
      <div className='bg-white m-6 p-3.5 rounded-md flex relative'>
        <h1 className='m-1 font-semibold text-xl'>Product Tab</h1>
        <Button
          className='h-9 absolute right-3 bottom-2'
          onClick={() => navigate('/addproduct')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 m-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Add product
        </Button>
      </div>

      <div className='bg-white m-6 p-3.5 rounded-md'>
        <h1 className='m-5 font-semibold text-xl'>Product List</h1>
        <div className='bg-black text-white font-semibold grid grid-cols-6 gap-2 p-4 rounded-md'>
          <h1 className='col-span-1'>Index</h1>
          <h1 className='col-span-1'>Product Image</h1>
          <h1 className='col-span-1'>Product Name</h1>
          <h1 className='col-span-1'>Category</h1>
          <h1 className='col-span-1'>Price</h1>
          <h1 className='col-span-1'>Stock</h1>
        </div>

        {products.map((product, index) => (
          <div key={product._id} className='bg-white border-2 border-gray-200 grid grid-cols-7 gap-2 p-4 mt-2 rounded-md'>
            <span className='col-span-1'>{index + 1}</span>
            <img src={product.image} className='col-span-1 w-20 h-20 rounded-md mr-2' alt='product' />
            <span className='col-span-1'>{product.name}</span>
            <span className='col-span-1'>{product.category.name}</span>
            <span className='col-span-1'>&#8377;{product.price}</span>
            <span className='col-span-1'>{product.countInStock}</span>
            <Button onClick={() => handleViewReviews(product._id,product.name,product.image)}>View Reviews</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
