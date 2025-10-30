import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="text-yellow-300">🛒</span> TechCart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link
            to="/"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Cart
          </Link>
          <button className="bg-yellow-300 text-indigo-700 px-4 py-1 rounded-lg hover:bg-yellow-400 transition">
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 text-white font-medium">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-indigo-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="block px-4 py-2 hover:bg-indigo-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>
          <button className="block w-full text-indigo-700 bg-yellow-300 px-4 py-2 rounded-lg my-2 hover:bg-yellow-400 transition">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
