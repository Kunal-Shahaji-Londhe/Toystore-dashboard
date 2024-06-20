import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Addproduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        richDescription: '',
        image: null,
        brand: '',
        price: '',
        category: '',
        countInStock: '',
        isFeatured: false,
    })

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://ecommerceapi-2-6l87.onrender.com/api/v1/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleImageChange = (e) => {
        setFormData({
          ...formData,
          image: e.target.files[0],
        });
      };

      
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
        
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFiN2VmNGI3M2EwOTVlMzEzMWQxN2MiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MDk1NDM3MjIsImV4cCI6MTcwOTYzMDEyMn0.qH5M33W9zKr5DhckrCvSV57n5bkaT3rE9dZbnqBdUjg'; // Replace with your actual bearer token

    try {
      const response = await axios.post('http://localhost:3000/api/v1/products', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product added successfully:', response.data);
      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

    const notify = () => toast("Added Product!");

  return (
    <div className='bg-white m-6 rounded-md h-[690px]'>
        <h1 className='p-6 font-semibold'>Add Product</h1>
        <div className='flex justify-between'>
        <form className='flex gap-2'
            onSubmit={handleSubmit}
        >
            <div className='border-2 border-gray-200 ml-6 h-[600px] w-[600px] rounded-lg'>
                  <div className='m-4'>
                    <Label htmlFor="name">Product Name</Label>
                    <Input 
                        type="text" 
                        id="name" 
                        placeholder="Product Name" 
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='mt-3 mb-3' />

                    <Label htmlFor="price">Price</Label>
                    <Input 
                        type="number" 
                        id="price" 
                        placeholder="Price"
                        name='price'
                        value={formData.price}
                        onChange={handleChange} 
                        className='mt-3 mb-3' />
                    
                    <Label htmlFor="Brand">Brand Name</Label>
                    <Input 
                        type="text" 
                        id="brand" 
                        placeholder="Brand" 
                        name='brand'
                        value={formData.brand}
                        onChange={handleChange}
                        className='mt-3 mb-3' />
                    
                      <Label htmlFor="category">Category</Label>
                        <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className='mt-3 mb-3 border border-gray-300 rounded-md px-3 py-2 w-[565px]'
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                    <Label htmlFor="stock">No. Of Stock</Label>
                    <Input 
                        type="number" 
                        id="stock" 
                        placeholder="Stock" 
                        name='countInStock'
                        value={formData.countInStock}
                        onChange={handleChange}
                        className='mt-3 mb-3' />
                    </div>
            </div>
            <div className='border-2 border-gray-200 mr-6 h-[600px] w-[600px] rounded-lg'>
                <div className='m-4'>
                <Label htmlFor="feature">Is Product Featured?</Label>
                    <Input 
                        type="boolean" 
                        id="feature" 
                        placeholder="Yes/No"
                        name='isFeatured'
                        value={formData.isFeatured}
                        onChange={handleChange}
                        className='mt-3 mb-3' />

                    <Label htmlFor="Product Description">Product Description</Label>
                    <Input 
                        type="text" 
                        id="pd" 
                        placeholder="Product Description" 
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        className='mt-3 mb-3' />
                    
                    <Label htmlFor="rd">Rich Description</Label>
                    <Input 
                        type="text" 
                        id="rd" 
                        placeholder="Rich Description" 
                        name='richDescription'
                        value={formData.richDescription}
                        onChange={handleChange}
                        className='mt-3 mb-3' />
                    
                    <Label htmlFor="productimg">Product Image</Label>
                    <Input 
                        type="file" 
                        id="image" 
                        placeholder="image" 
                        name='image'
                        accept='image/*'
                        //value={formData.image}
                        onChange={handleImageChange}
                        className='mt-3 mb-3' />

                    <Button
                        onClick={notify}
                        className='mt-3 mb-3 bg-black'
                    >
                        Publish Product
                    </Button>
                    <ToastContainer />
                </div>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Addproduct