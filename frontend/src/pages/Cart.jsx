import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart().then(setCart);
  }, []);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold">Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between p-2 border-b">
              <span>{item.name} - {item.price} KZT</span>
              <button className="text-red-500" onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
