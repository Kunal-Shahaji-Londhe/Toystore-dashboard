import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        isFeatured: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (e.target.type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0], //only allow one file selection
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        };
    };

     //configuration for the Fetch API
    const url = 'https://ecommerceapi-2-6l87.onrender.com/api/v1/products';
    const bearerToken  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFiN2VmNGI3M2EwOTVlMzEzMWQxN2MiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MDkwMTU4NDYsImV4cCI6MTcwOTEwMjI0Nn0.3zAjVQVG5j1wE6khODNhucG5RAE2G7A8EYbJOoZmA84'

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
    });

    const options = {
        method: 'POST',
        headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${bearerToken}`
        },
        body: formDataToSend
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //making post request for new product

        fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log('Success:' , data);
        })
        .catch(error => {
            console.error('Error:', error)
        })
    }

    const notify = () => toast("Added Product!");

  return (
    <div className='bg-white m-6 rounded-md h-[690px]'>
        <h1 className='p-6 font-semibold'>Add Product</h1>
        <div className='flex justify-between'>
        <form className='flex gap-2'
            onSubmit={handleSubmit}
        >
            <div className='border-2 border-gray-200 ml-6 h-[600px] w-[600px] rounded-lg'>
                    <div className='m-4'><Label htmlFor="name">Product Name</Label>
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
                    
                    <Label htmlFor="Category">Category Name</Label>
                    <Input 
                        type="text" 
                        id="category" 
                        placeholder="Category" 
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        className='mt-3 mb-3' />

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
                        value={formData.image}
                        onChange={handleChange}
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