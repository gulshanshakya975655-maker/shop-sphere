import { useEffect, useState } from 'react';
import API from '../utils/api';

export default function AdminDashboard() {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
    brand: '',
  });

  const fetchProducts = async () => {
    const { data } = await API.get('/products', { params: { page: 1 } });
    setProducts(data.products);
  };

  const fetchOrders = async () => {
    const { data } = await API.get('/orders');
    setOrders(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', category: '', image: '', stock: '', brand: '' });
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put(`/products/${editing}`, form);
      } else {
        await API.post('/products', form);
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving product');
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
      brand: product.brand,
    });
    setEditing(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await API.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  const updateOrderStatus = async (id, status) => {
    await API.put(`/orders/${id}/status`, { status });
    fetchOrders();
  };

  const statusStyle = (status) => {
    if (status === 'Delivered') return 'bg-green-100 text-green-700';
    if (status === 'Cancelled') return 'bg-red-100 text-red-700';
    if (status === 'Shipped') return 'bg-blue-100 text-blue-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const inputClass =
    'w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold mb-1 text-gray-900">⚙️ Admin Dashboard</h1>
      <p className="text-gray-500 text-sm mb-6">Manage your products and orders</p>

      <div className="flex gap-2 mb-6 bg-white w-fit p-1 rounded-full shadow-sm border border-gray-100">
        <button
          onClick={() => setTab('products')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            tab === 'products'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Products ({products.length})
        </button>
        <button
          onClick={() => setTab('orders')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            tab === 'orders'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Orders ({orders.length})
        </button>
      </div>

      {tab === 'products' && (
        <div className="grid md:grid-cols-3 gap-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3 md:col-span-1 h-fit"
          >
            <h2 className="font-semibold text-gray-800 mb-2">
              {editing ? '✏️ Edit Product' : '➕ Add New Product'}
            </h2>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className={inputClass}
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows={3}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              className={inputClass}
            />
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className={inputClass}
            />
            <input
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              required
              className={inputClass}
            />
            <input
              placeholder="Brand"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className={inputClass}
            />
            <div className="flex gap-2 pt-1">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-full font-semibold flex-1 hover:opacity-90 transition-opacity text-sm">
                {editing ? 'Update' : 'Add'} Product
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-gray-300 px-4 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="md:col-span-2 space-y-3">
            {products.length === 0 && (
              <p className="text-gray-500 bg-white rounded-2xl p-6 text-center shadow-sm">
                No products yet — add your first one!
              </p>
            )}
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
              >
                <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-xl" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{p.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{p.price} · Stock: {p.stock}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(p)}
                  className="text-indigo-600 font-semibold text-sm px-3 py-1.5 rounded-full hover:bg-indigo-50 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-500 font-semibold text-sm px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="space-y-3">
          {orders.length === 0 && (
            <p className="text-gray-500 bg-white rounded-2xl p-6 text-center shadow-sm">
              No orders yet.
            </p>
          )}
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center flex-wrap gap-3"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  #{order._id.slice(-8)} — {order.user?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {order.user?.email} · ₹{order.totalPrice}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(order.status)}`}>
                  {order.status}
                </span>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}