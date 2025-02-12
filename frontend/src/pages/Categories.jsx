import { useEffect, useState } from "react";
import { getCategories, getProductsByCategory } from "../api";
import ProductCard from "../components/ProductCard";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      console.log("Categories:", data); // <-- Проверяем
      setCategories(data);
    });
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    const filteredProducts = await getProductsByCategory(categoryId);
    console.log("Products in category:", filteredProducts); // <-- Проверяем
    setProducts(filteredProducts);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold">Categories</h1>
      <div className="flex gap-4 mt-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 border rounded ${selectedCategory === category.id ? "bg-black text-white" : ""}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </div>
  );
}
