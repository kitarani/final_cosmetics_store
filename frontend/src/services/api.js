import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:8080";

export const getProducts = async () => {
    const response = await axios.get("http://localhost:8080/api/products");
    console.log("Fetched products:", response.data); // <-- Проверяем, что приходит от API
    return response.data;
  };

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
  return response.data.token;
};

export const getCart = async () => {
    const response = await axios.get("http://localhost:8080/api/cart", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  };
  
  export const removeFromCart = async (itemId) => {
    await axios.delete(`http://localhost:8080/api/cart/remove/${itemId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };

  export const getProductById = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/products/${id}`);
    return response.data;
  };
  
  export const addToCart = async (productId) => {
    await axios.post(
      "http://localhost:8080/api/cart/add",
      { product_id: productId },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
  };

  export const getAllUsers = async () => {
    const response = await axios.get("http://localhost:8080/api/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  };
  
  export const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:8080/api/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };
  
  
  
