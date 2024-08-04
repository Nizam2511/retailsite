document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
    ];

    const productContainer = document.getElementById('products');
    const checkoutButton = document.getElementById('checkout');

    let cart = [];

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        alert(`${product.name} added to cart.`);
    };

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        const orderDetails = cart.map(product => `${product.name} - $${product.price}`).join('\n');
        alert(`Your order:\n${orderDetails}`);
        saveOrder(orderDetails);
        cart = [];
    });

    function saveOrder(orderDetails) {
        const blob = new Blob([orderDetails], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'order.txt';
        link.click();
    }
});
