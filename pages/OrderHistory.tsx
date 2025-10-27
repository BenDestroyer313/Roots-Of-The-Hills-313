import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { MOCK_ORDERS } from '../constants';
import type { Order } from '../types';
import { Package } from 'lucide-react';

const OrderHistory: React.FC = () => {

    const getStatusChipClass = (status: Order['status']) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'Processing':
                return 'bg-blue-100 text-blue-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header title="Order History" />
            {MOCK_ORDERS.length === 0 ? (
                <div className="text-center py-20 px-4">
                    <Package className="w-16 h-16 mx-auto text-gray-300" />
                    <h2 className="text-2xl font-semibold text-gray-700 mt-4">No orders yet</h2>
                    <p className="text-gray-500 mt-2">Your past orders will appear here.</p>
                </div>
            ) : (
                <div className="p-4 space-y-4">
                    {MOCK_ORDERS.map(order => (
                        <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center pb-3 border-b">
                                <div>
                                    <p className="font-bold text-rh-dark">Order #{order.id}</p>
                                    <p className="text-sm text-gray-500">{order.date}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusChipClass(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="py-3 space-y-3">
                                {order.items.map(item => (
                                    <Link to={`/product/${item.productId}`} key={item.productId} className="flex items-center gap-4 hover:bg-gray-50 p-1 rounded-md">
                                        <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-md" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm text-rh-dark">{item.title}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-sm text-rh-dark">₹{item.price * item.quantity}</p>
                                    </Link>
                                ))}
                            </div>
                            <div className="flex justify-end items-center pt-3 border-t">
                                <p className="font-bold text-rh-dark">Total: ₹{order.total.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
