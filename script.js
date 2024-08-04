// Initialize cart globally
let cart = [];

// Load cart items from local storage if available
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
}

document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
    ];

    const productContainer = document.getElementById('products');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartDetails = document.getElementById('cart-details');
    const paymentForm = document.getElementById('payment-form');
    const paymentMethod = document.getElementById('paymentMethod');
    const cardDetails = document.getElementById('card-details');
    const upiDetails = document.getElementById('upi-details');

    // Display products
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product col-md-4';
        productElement.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });

    // Update cart display on load
    updateCart();

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    };

    function updateCart() {
        cartCount.textContent = cart
