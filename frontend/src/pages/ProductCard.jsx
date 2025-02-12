/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product || !product.name || !product.image_url) {
    console.log("Ошибка: product не содержит данных", product);
    return <p className="text-red-500">Error: Product data is missing.</p>;
  }

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-2 text-lg font-medium">{product.name}</h3>
      <p className="text-gray-500">{product.price} KZT</p>
      <Link to={`/products/${product.id}`} className="text-blue-600 mt-2 block">
        View Details
      </Link>
    </div>
  );
}
