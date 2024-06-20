import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryAnalytics, setCategoryAnalytics] = useState([]);

  useEffect(() => {
    // Fetch categories
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/categories');
      const data = await response.json();
      setCategories(data);

      // Fetch category analytics
      const analyticsData = await fetchCategoryAnalytics();
      setCategoryAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCategoryAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/analytics/sales-by-category');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching category analytics:', error);
      return [];
    }
  };

  return (
    <div>
      <div className='bg-white m-6 p-3.5 rounded-md flex relative'>
        <h1 className='m-1 font-semibold text-xl'>Category Tab</h1>
        <Button
          className='h-9 absolute right-3 bottom-2'
          onClick={() => navigate('/addcategory')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 m-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Add Category
        </Button>
      </div>

      <div className='bg-white m-6 p-3.5 rounded-md'>
        <h1 className='m-5 font-semibold text-xl'>Category List</h1>
        <div className='bg-black text-white font-semibold grid grid-cols-4 gap-2 p-4 rounded-md'>
          <h1 className='col-span-1'>Category Name</h1>
          <h1 className='col-span-1'>Total Revenue</h1>
          <h1 className='col-span-1'>Number of Orders</h1>
          <h1 className='col-span-1'>Products</h1>
        </div>

        {categories.map((category, index) => (
          <div key={category._id} className='bg-white border-2 border-gray-200 grid grid-cols-4 gap-2 p-4 mt-2 rounded-md'>
            <span className='col-span-1'>{category.name}</span>
            <span className='col-span-1'>&#8377;{categoryAnalytics[index]?.totalRevenue || 0}</span>
            <span className='col-span-1'>{categoryAnalytics[index]?.numberOfOrders || 0}</span>
            <span className='col-span-1'>{categoryAnalytics[index]?.productCount || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
