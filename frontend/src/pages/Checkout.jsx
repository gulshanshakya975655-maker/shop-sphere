import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({ street: '', city: '', state: '', pincode: '' });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 999 ? 0 : 49;
  const totalPrice = itemsPrice + shippingPrice;

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const placeOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    setError('');
    try {
      const orderItems = cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item.product,
      }));

      const { data } = await API.post('/orders', {
        orderItems,
        shippingAddress: address,
        paymentMethod: 'Razorpay',
        itemsPrice,
        shippingPrice,
        totalPrice,
      });

      clearCart();
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={placeOrder} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 h-fit">
          <h2 className="font-semibold text-lg text-gray-800">📍 Shipping Address</h2>
          {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
          <input
            name="street"
            placeholder="Street Address"
            value={address.street}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            name="pincode"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            disabled={placing}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-indigo-200"
          >
            {placing ? 'Placing Order...' : `Place Order — ₹${totalPrice}`}
          </button>
        </form>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="font-semibold text-lg mb-4 text-gray-800">🧾 Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.product} className="flex justify-between text-sm mb-2 text-gray-600">
              <span>
                {item.name} x{item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <hr className="my-3 border-gray-100" />
          <div className="flex justify-between text-sm mb-1 text-gray-600">
            <span>Items Price</span>
            <span>₹{itemsPrice}</span>
          </div>
          <div className="flex justify-between text-sm mb-1 text-gray-600">
            <span>Shipping</span>
            <span className={shippingPrice === 0 ? 'text-green-600 font-semibold' : ''}>
              {shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}
            </span>
          </div>
          <div className="flex justify-between font-extrabold text-lg mt-3 pt-3 border-t border-gray-100 text-gray-900">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}