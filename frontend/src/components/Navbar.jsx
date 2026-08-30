import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { userInfo, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        <Link to="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-1.5">
          <span className="text-2xl">🛍️</span>
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ShopSphere
          </span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600">
            🔍
          </button>
        </form>

        <div className="flex items-center gap-5 text-gray-700 font-medium">
          <Link to="/cart" className="relative flex items-center gap-1 hover:text-indigo-600 transition-colors">
            🛒 <span className="hidden sm:inline">Cart</span>
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {totalQty}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="flex items-center gap-4">
              <Link to="/myorders" className="hover:text-indigo-600 transition-colors hidden sm:inline">
                My Orders
              </Link>
              {userInfo.role === 'admin' && (
                <Link to="/admin" className="hover:text-indigo-600 transition-colors font-semibold text-purple-600">
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="bg-gray-900 text-white px-4 py-1.5 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1.5 rounded-full font-medium hover:opacity-90 transition-opacity text-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}