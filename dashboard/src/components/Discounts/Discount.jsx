import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DiscountComponent = () => {
  const [discounts, setDiscounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newDiscount, setNewDiscount] = useState({
    category: '',
    discountPercentage: 0,
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchDiscounts();
    fetchCategories();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/discounts');
      setDiscounts(response.data);
    } catch (error) {
      console.error('Error fetching discounts:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiscount({ ...newDiscount, [name]: value });
  };

  const handleCreateDiscount = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/discounts', newDiscount);
      fetchDiscounts();
      toast.success('Discount created successfully');
    } catch (error) {
      console.error('Error creating discount:', error);
      toast.error('Failed to create discount');
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : '';
  };

  return (
    <div className="container mx-auto p-6 bg-white my-5 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Discount Management</h1>
      <div className="mb-8 max-w-xl">
        <h2 className="text-lg font-semibold mb-2">Create New Discount</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <label className="w-32">Category:</label>
            <select
              name="category"
              value={newDiscount.category}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md flex-1"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32">Discount Percentage:</label>
            <input
              type="number"
              name="discountPercentage"
              value={newDiscount.discountPercentage}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={newDiscount.startDate}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32">End Date:</label>
            <input
              type="date"
              name="endDate"
              value={newDiscount.endDate}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md flex-1"
            />
          </div>
          <button
            onClick={handleCreateDiscount}
            className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Create Discount
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Discount List</h2>
        <ul className="list-disc pl-6">
          {discounts.map((discount, index) => (
            <li key={index} className="mb-2">
              Category: {getCategoryName(discount.category)}, Discount: {discount.discountPercentage}%, Start Date: {new Date(discount.startDate).toLocaleDateString()}, End Date: {new Date(discount.endDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DiscountComponent;
