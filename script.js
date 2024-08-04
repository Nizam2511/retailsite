// Initialize cart globally
let cart = [];

// Load cart items from local storage if available
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
}

const products = [
    { id: 1, name: 'Makhana Variety 1', price: 10, image: 'images/makhana1.jpg' },
    { id: 2, name: 'Makhana Variety 2', price: 20, image: 'images/makhana2.jpg' },
    { id: 3, name: 'Makhana Variety 3', price: 30, image: 'images/makhana3.jpg' },
];

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('products');
    const cartCount = document.getElementById('cart-count');

    // Display products on the homepage
    if (productContainer) {
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product col-md-4';
            productElement.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Price: $${product.price}</p>
                        <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            `;
            productContainer.appendChild(productElement);
        });
    }

    // Update cart display on load
    updateCart();
    
    // Load cart items in the cart page
    if (document.getElementById('cart-items')) {
        loadCartItems();
    }

    // Load cart details in the payment page
    if (document.getElementById('cart-details')) {
        loadCartDetails();
    }
});

// Add product to cart
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
};

// Update cart display
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Load cart items into the cart page
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        cartItem.innerHTML = `${item.name} - $${item.price}`;
        total += item.price;
        cartItemsContainer.appendChild(cartItem);
    });

    totalPrice.textContent = total.toFixed(2);
}

// Load cart details into the payment page
function loadCartDetails() {
    const cartDetailsContainer = document.getElementById('cart-details');
    const totalPricePayment = document.getElementById('total-price-payment');
    let total = 0;

    cart.forEach(item => {
        const cartDetail = document.createElement('div');
        cartDetail.className = 'mb-2';
        cartDetail.innerHTML = `${item.name} - $${item.price}`;
        total += item.price;
        cartDetailsContainer.appendChild(cartDetail);
    });

    totalPricePayment.textContent = total.toFixed(2);
}

// Handle payment form submission
document.getElementById('payment-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const paymentMethod = document.getElementById('paymentMethod').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const upiId = document.getElementById('upiId').value;

    // Here you can implement payment processing logic
    // For now, we will just clear the cart and show an alert
    alert(`Payment successful using ${paymentMethod}. Thank you for your purchase!`);

    // Clear the cart and local storage
    cart = [];
    localStorage.removeItem('cart');

    // Redirect to home page after payment
    window.location.href = 'index.html';
});

// Toggle payment method details
document.getElementById('paymentMethod')?.addEventListener('change', (event) => {
    const method = event.target.value;
    document.getElementById('card-details').style.display = method === 'card' ? 'block' : 'none';
    document.getElementById('upi-details').style.display = method === 'upi' ? 'block' : 'none';
});
