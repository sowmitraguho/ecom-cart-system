import { Link } from "react-router";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="font-bold text-lg">🛒 MockCart</Link>
                <div className="flex gap-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/cart" className="hover:underline">Cart</Link>
                </div>
            </div>
        </nav>
    );
}
