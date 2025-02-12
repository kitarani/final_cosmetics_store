import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900">
      <h1 className="text-4xl font-semibold">Welcome to Cosmetic Store</h1>
      <Link to="/products" className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800">
        View Products
      </Link>
    </div>
  );
}
