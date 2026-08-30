import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { userInfo } = useAuth();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [msg, setMsg] = useState('');
  const [added, setAdded] = useState(false);

  const fetchProduct = async () => {
    const { data } = await API.get(`/products/${id}`);
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => navigate('/cart'), 600);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/products/${id}/reviews`, { rating, comment });
      setMsg('Review added successfully!');
      setComment('');
      fetchProduct();
    } catch (error) {
      setMsg(error.response?.data?.message || 'Error adding review');
    }
  };

  if (!product)
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 animate-pulse">
        <div className="w-full h-96 bg-gray-200 rounded-2xl"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-2xl shadow-md p-4">
          <img src={product.image} alt={product.name} className="w-full rounded-xl object-cover" />
        </div>

        <div>
          <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>
          <div className="flex items-center gap-1 my-3 bg-yellow-50 w-fit px-3 py-1 rounded-full">
            <span className="text-yellow-500">⭐</span>
            <span className="font-semibold text-sm">{product.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm">({product.numReviews} reviews)</span>
          </div>
          <p className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ₹{product.price}
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">{product.description}</p>
          <p className="mb-5">
            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1 rounded-full text-sm font-semibold">
                ✓ In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm font-semibold">
                ✕ Out of Stock
              </span>
            )}
          </p>

          {product.stock > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              added
                ? 'bg-green-600'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 shadow-lg shadow-indigo-200'
            }`}
          >
            {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
          </button>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews.length === 0 && (
          <p className="text-gray-500 bg-white rounded-xl p-4 shadow-sm">No reviews yet — be the first to review!</p>
        )}
        <div className="space-y-3 mb-6">
          {product.reviews.map((r) => (
            <div key={r._id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">{r.name}</span>
                <span className="text-yellow-500 text-sm">{'⭐'.repeat(r.rating)}</span>
              </div>
              <p className="text-gray-600 text-sm">{r.comment}</p>
            </div>
          ))}
        </div>

        {userInfo ? (
          <form onSubmit={submitReview} className="bg-white border border-gray-100 rounded-xl p-5 max-w-md shadow-sm">
            <h3 className="font-semibold mb-3">Write a Review</h3>
            {msg && <p className="text-sm text-indigo-600 mb-3">{msg}</p>}
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              required
              rows={3}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition-opacity">
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-gray-500 bg-white rounded-xl p-4 shadow-sm">Please login to write a review.</p>
        )}
      </div>
    </div>
  );
}