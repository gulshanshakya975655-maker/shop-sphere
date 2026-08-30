export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-extrabold flex items-center gap-2 mb-2">
            <span>🛍️</span>
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              ShopSphere
            </span>
          </h3>
          <p className="text-sm text-gray-400">
            Shop smarter, live better. Quality products delivered right to your door.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/cart" className="hover:text-white transition-colors">Cart</a></li>
            <li><a href="/myorders" className="hover:text-white transition-colors">My Orders</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Get in Touch</h4>
          <p className="text-sm text-gray-400">support@shopsphere.com</p>
          <p className="text-sm text-gray-400 mt-1">Mon–Sat, 9am–6pm</p>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ShopSphere. Built with ❤️ for learning.
      </div>
    </footer>
  );
}