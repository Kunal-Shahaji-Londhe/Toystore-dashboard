import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function AddCategory() {
    const [formData, setFormData] = useState({
        name: '',
        icon: null,
    });

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
            icon: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('icon', formData.icon);

        try {
            const response = await axios.post('http://localhost:3000/api/v1/categories', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Category added successfully:', response.data);
            
            toast.success("Category Added Successfully!");
        } catch (error) {
            console.error('Error adding category:', error);
            
            toast.error("Error Adding Category");
        }
    };

    return (
        <div className='bg-white m-6 rounded-md h-[690px]'>
            <h1 className='p-6 font-semibold'>Add Category</h1>
            <div className='flex justify-between'>
                <form
                    onSubmit={handleSubmit}
                    className='flex gap-2'
                >
                    <div className='border-2 border-gray-200 ml-6 h-[600px] w-[600px] rounded-lg'>
                        <div className='m-4'>
                            <Label htmlFor="name">Category Name</Label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Category Name"
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                className='mt-3 mb-3'
                            />
                        </div>
                    </div>
                    <div className='border-2 border-gray-200 mr-6 h-[600px] w-[600px] rounded-lg'>
                        <div className='m-4'>
                            <Label htmlFor="image">Category Image</Label>
                            <Input
                                type="file"
                                id="image"
                                name='icon'
                                accept='image/*'
                                onChange={handleImageChange}
                                className='mt-3 mb-3'
                            />
                            <Button
                                type="submit"
                                className='mt-3 mb-3 bg-black'
                            >
                                Add Category
                            </Button>
                            <ToastContainer />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCategory;
