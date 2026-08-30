import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-red-600 text-xs font-bold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          <span className="flex items-center gap-1 text-sm bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">
            ⭐ {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}