import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await API.get(`/orders/${id}`);
      setOrder(data);
    };
    fetchOrder();
  }, [id]);

  if (!order)
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse space-y-4">
        <div className="h-24 bg-gray-200 rounded-2xl"></div>
        <div className="h-32 bg-gray-200 rounded-2xl"></div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-6 mb-6 text-center shadow-lg">
        <p className="text-4xl mb-2">✅</p>
        <p className="font-bold text-lg">Order Placed Successfully!</p>
        <p className="text-sm text-green-100 mt-1">Order ID: {order._id}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h2 className="font-semibold mb-2 text-gray-800">📍 Shipping Address</h2>
        <p className="text-gray-600 text-sm">
          {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
          {order.shippingAddress.state} - {order.shippingAddress.pincode}
        </p>
        <p className="mt-3 text-sm">
          Status:{' '}
          <span className="font-semibold text-indigo-600">{order.status}</span>
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="font-semibold mb-4 text-gray-800">🧾 Items</h2>
        {order.orderItems.map((item) => (
          <div key={item.product} className="flex justify-between text-sm mb-2 text-gray-600">
            <span>
              {item.name} x{item.qty}
            </span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <hr className="my-3 border-gray-100" />
        <div className="flex justify-between font-extrabold text-lg text-gray-900">
          <span>Total</span>
          <span>₹{order.totalPrice}</span>
        </div>
      </div>

      <Link
        to="/"
        className="block text-center mt-6 text-indigo-600 font-semibold hover:underline"
      >
        ← Continue Shopping
      </Link>
    </div>
  );
}