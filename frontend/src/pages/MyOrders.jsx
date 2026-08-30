import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await API.get('/orders/myorders');
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const statusStyle = (status) => {
    if (status === 'Delivered') return 'bg-green-100 text-green-700';
    if (status === 'Cancelled') return 'bg-red-100 text-red-700';
    if (status === 'Shipped') return 'bg-blue-100 text-blue-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">📦 My Orders</h1>
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm h-16 animate-pulse"></div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Start Shopping →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/order/${order._id}`}
              className="block bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center flex-wrap gap-3">
                <div>
                  <p className="font-semibold text-gray-800">Order #{order._id.slice(-8)}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(order.status)}`}>
                  {order.status}
                </span>
                <span className="font-bold text-gray-900">₹{order.totalPrice}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}