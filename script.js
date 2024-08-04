document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
    ];

    const productContainer = document.getElementById('products');
    const checkoutButton = document.getElementById('checkout');
    const cartLink = document.getElementById('cart-link');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartElement = document.getElementById('cart');
    const paymentElement = document.getElementById('payment');

    let cart = [];

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

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        updateCart();
    };

    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${item.name} - $${item.price}`;
            cartItems.appendChild(li);
        });
        cartElement.style.display = cart.length > 0 ? 'block' : 'none';
    }

    checkoutButton.addEventListener('click', () => {
        cartElement.style.display = 'none';
        paymentElement.style.display = 'block';
    });
});
