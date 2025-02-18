const apiUrl = 'http://localhost:8080'; // Замените на ваш URL бэкенда
let token = '';
let userId = '';

async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message || data.error);
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.token) {
        token = data.token;
        userId = data.userId; // Предполагается, что вы возвращаете userId
        alert('Login successful!');
        fetchProducts();
        fetchCart();
        fetchOrders();
    } else {
        alert(data.error);
    }
}

async function fetchProducts() {
    const response = await fetch(`${apiUrl}/products`);
    const products = await response.json();
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Category: ${product.category.name}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

async function addToCart(productId) {
    const response = await fetch(`${apiUrl}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId }),
    });

    const data = await response.json();
    alert(data.message || data.error);
    fetchCart();
}

async function fetchCart() {
    const response = await fetch(`${apiUrl}/cart/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const cartItems = await response.json();
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <span>${item.product.name}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartList.appendChild(cartItemDiv);
    });
}

async function removeFromCart(cartItemId) {
    const response = await fetch(`${apiUrl}/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    alert(data.message || data.error);
    fetchCart();
}

async function checkout() {
    const response = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId }),
    });

    const data = await response.json();
    alert(data.message || data.error);
    fetchCart();
    fetchOrders();
}

async function fetchOrders() {
    const response = await fetch(`${apiUrl}/orders/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const orders = await response.json();
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.innerHTML = `
            <h4>Order ID: ${order.id}</h4>
            <p>Status: ${order.status}</p>
        `;
        orderList.appendChild(orderDiv);
    });
}