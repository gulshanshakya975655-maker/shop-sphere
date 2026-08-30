import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (!userInfo) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <p className="text-xl text-gray-600 mb-2 font-semibold">Your cart is empty</p>
        <p className="text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div
            key={item.product}
            className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
          >
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
            <div className="flex-1">
              <Link to={`/product/${item.product}`} className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
                {item.name}
              </Link>
              <p className="text-gray-500 text-sm">₹{item.price} each</p>
            </div>
            <select
              value={item.qty}
              onChange={(e) => updateQty(item.product, Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {[...Array(Math.min(item.stock, 10)).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            <p className="font-bold w-20 text-right text-gray-900">₹{item.price * item.qty}</p>
            <button
              onClick={() => removeFromCart(item.product)}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center flex-wrap gap-4">
        <span className="text-2xl font-extrabold text-gray-900">Total: ₹{total}</span>
        <button
          onClick={handleCheckout}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}