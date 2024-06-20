import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import prod from '../../../public/vite.svg';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Fetch orders from API
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    // Fetch orders based on date range
    const url = `http://localhost:3000/api/v1/orders`;
    fetch(url)
      .then(response => response.json())
      .then(data => {setOrders(data)
        console.log(data)})
      .catch(error => console.error('Error fetching orders:', error));
      
  };

  const handleSort = () => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        // Update orders list after status change
        fetchOrders();
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter(order => {
    if(!startDate || !endDate){
      return true;
    } else {
      const orderDate = new Date(order.dateOrdered);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    }
  })

  console.log('filter orders: ', filteredOrders)

  return (
    <div>
      <div className='bg-white m-6 p-3.5 rounded-md flex relative'>
        <h1 className='m-1 font-semibold text-xl'>Order Tab</h1>
        <div className='flex space-x-2'>
          <input
            type='date'
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className='border rounded-md py-1 px-2'
          />
          <input
            type='date'
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className='border rounded-md py-1 px-2'
          />
          <Button onClick={handleSort}>Sort</Button>
        </div>
      </div>  

      <div>
      <div className='bg-white m-6 h-[600px] rounded-md'>
        <div className='bg-white m-6 p-3.5 rounded-md'>
          <h1 className='m-5 font-semibold text-xl'>Order List</h1>
          <p className='font-semibold m-5'>{filteredOrders.length} orders found</p>
          <div className='bg-black text-white font-semibold grid grid-cols-8 gap-4 p-4 rounded-md'>
            <h1 className='col-span-1'>Index</h1>
            <h1 className='col-span-1'>Order Image</h1>
            <h1 className='col-span-1'>Order ID</h1>
            <h1 className='col-span-1'>Product Name</h1>
            <h1 className='col-span-1'>Customer Name</h1>
            <h1 className='col-span-1'>Email</h1>
            <h1 className='col-span-1 text-center'>Price</h1>
            <h1 className='col-span-1'>Status</h1>
          </div>

          {filteredOrders.map((order, index) => (
            <div key={order._id} className='bg-white border-2 border-gray-200 grid grid-cols-8 gap-4 p-4 mt-2 rounded-md items-center'>
              <span className='col-span-1'>{index + 1}</span>
              <img src={order.orderItems[0]?.product?.image || prod} className='col-span-1 w-16 h-16 rounded-md mr-2' alt='order' />
              <span className='col-span-1'>{index + 1001}</span>
              <span className='col-span-1'>{order.orderItems[0]?.product?.name || 'N/A'}</span>
              <span className='col-span-1'>{order.user?.name || 'N/A'}</span>
              <span className='col-span-1'>{order.user?.email || 'N/A'}</span>
              <span className='col-span-1 text-center'>&#8377;{order.totalPrice}</span>
              {/*<span className='col-span-1 whitespace-nowrap'>{order.status}</span>*/}
              <div className='col-span-1'>
                  <select
                    value={order.status}
                    onChange={e => handleStatusChange(order._id, e.target.value)}
                    className='border rounded-md py-1 px-2'
                  >
                    <option value='Pending'>{order.status}</option>
                    <option value='Out for Delivery'>Out for Delivery</option>
                    <option value='Delivered'>Delivered</option>
                  </select>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Orders;
