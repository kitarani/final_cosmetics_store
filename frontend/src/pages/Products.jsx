import { useEffect, useState } from "react";
import { getProducts } from "../api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      console.log("Products received in frontend:", data); // <-- Проверяем
      setProducts(data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </div>
  );
}
