import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function MyPurchaseComponent() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [returningOrderId, setReturningOrderId] = useState(null); // To track the order for return
    const [returnReason, setReturnReason] = useState(''); // To store return reason
    const { user } = useAuth();
    const userId = user.user._id;

        const fetchUserOrders = async (userId, setOrders, setLoading) => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/orders/get/userorders/${userId}`);
                const filteredOrders = response.data.userOrderList.filter(order => order.status !== 'canceled')
                setOrders(filteredOrders);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };


        useEffect(() => {
            const intervalId = setInterval(() => {
                fetchUserOrders(userId, setOrders, setLoading);
            }, 5000); // Fetch orders every 5 seconds (adjust the interval as needed)
        
            return () => clearInterval(intervalId); // Cleanup interval on component unmount
        }, [userId]); // Re-run effect when userId changes
        

    const simplifyOrderId = (orderId) => {
        return orderId.substring(0, 6);
    };


    const handleCancelOrder = async (orderId) => {
        try {
            await axios.put(`http://localhost:3000/api/v1/orders/cancel/${orderId}`, { "status": "canceled" });
            fetchUserOrders(userId, setOrders, setLoading)
            toast.success('Order cancelled successfully!');
        } catch (error) {
            console.error('Error cancelling order:', error);
            toast.error('Failed to cancel order. Please try again later.');
        }
    };

    const handleReturnOrder = (orderId) => {
        setReturningOrderId(orderId);
    };

    const handleReturnFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:3000/api/v1/return/return-orders`, { orderId: returningOrderId,userId: userId, reason: returnReason });
            // Update the order status to "Returned"
            fetchUserOrders(userId, setOrders, setLoading)
            await axios.put(`http://localhost:3000/api/v1/orders/${returningOrderId}`, { "status": "Returned" });
            toast.success('Order returned successfully!');
            setReturningOrderId(null);
            setReturnReason('');
        } catch (error) {
            console.error('Error returning order:', error);
            toast.error('Failed to return order. Please try again later.');
        }
    };

    // Function to render progress badge based on order status
    const renderProgressBadge = (status) => {
        switch (status) {
            case 'Pending':
                return <span className="bg-yellow-400 text-white px-2 py-1 rounded-full">Pending</span>;
            case 'Out for Delivery':
                return <span className="bg-blue-400 text-white px-2 py-1 rounded-full">Out for Delivery</span>;
            case 'Delivered':
                return <span className="bg-green-400 text-white px-2 py-1 rounded-full">Delivered</span>;
            case 'Returned':
                return <span className="bg-red-600 text-white px-2 py-1 rounded-full">Returned</span>;
            default:
                return null;
        }
    };
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">My Purchases</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {orders.length === 0 ? (
                        <p>No orders found for this user.</p>
                    ) : (
                        <div className="divide-y divide-gray-200">
                        {orders.map(order => (
                                <div key={order._id} className="py-4">
                                    <h3 className="text-lg font-semibold">Order ID: {simplifyOrderId(order._id)}</h3>
                                    <p className="text-gray-600">Total Price: &#8377;{order.totalPrice}</p>
                                    <p className="text-gray-700">Status: {renderProgressBadge(order.status)}</p>
                                    <ul className="mt-2">
                                        {order.orderItems.map(item => (
                                            <li key={item._id} className="py-2 flex items-center">
                                                <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-full mr-4" />
                                                <div>
                                                    <p className="text-gray-700">Product Name: {item.product.name}</p>
                                                    <p className="text-gray-700">Quantity: {item.quantity}</p>
    
                                                    <div className="flex items-center space-x-4">
                                                        {order.status === 'Delivered' ? (
                                                            <button onClick={() => handleReturnOrder(order._id)} className="bg-black text-white px-3 py-1 my-3 mx-2 rounded hover:bg-gray-800">Return Order</button>
                                                        ) : (
                                                            <button onClick={() => handleCancelOrder(order._id)} className="bg-black text-white px-3 py-1 rounded my-3 hover:bg-gray-800">Cancel Order</button>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    {returningOrderId === order._id && (
                                        <form onSubmit={handleReturnFormSubmit}>
                                            <textarea value={returnReason} onChange={(e) => setReturnReason(e.target.value)} placeholder="Enter reason for return" className="w-full p-2 border border-gray-300 rounded mb-2" />
                                            <button type="submit" className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800">Submit Return</button>
                                        </form>
                                    )}
                                </div>
                            ))}

                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default MyPurchaseComponent;
