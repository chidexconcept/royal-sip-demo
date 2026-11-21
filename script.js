// ===============================
// ROYAL SIP - SHOPPING CART
// ===============================

let cart = [];
let cartOpen = false;

// Add product to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    showMessage(name + " added to cart!");
}

// Remove product from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

// Change quantity
function changeQuantity(name, amount) {
    const item = cart.find(item => item.name === name);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(name);
    } else {
        updateCart();
    }
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartCount || !cartTotal) return;

    let totalItems = 0;
    let totalPrice = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₦${item.price.toLocaleString()}</p>
                </div>

                <div class="cart-controls">
                    <button onclick="changeQuantity('${item.name}', -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.name}', 1)">+</button>
                    <button onclick="removeFromCart('${item.name}')">🗑</button>
                </div>
            </div>
        `;
    });

    cartCount.textContent = totalItems;
    cartTotal.textContent = "₦" + totalPrice.toLocaleString();
}

// Open and close cart
function toggleCart() {
    const cartPanel = document.getElementById("cart-panel");

    if (!cartPanel) return;

    cartOpen = !cartOpen;

    cartPanel.classList.toggle("active", cartOpen);
}

// WhatsApp checkout
function checkout() {
    if (cart.length === 0) {
        showMessage("Your cart is empty!");
        return;
    }

    let message = "Hello Royal Sip! I would like to place an order:\n\n";

    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    message += `\nTotal: ₦${total.toLocaleString()}\n\nPlease confirm my order.`;

    // DEMO NUMBER - Replace before launching for a real business
    const whatsappNumber = "234XXXXXXXXXX";

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
}

// Mobile navigation
function toggleMenu() {
    const menu = document.querySelector(".nav-links");

    if (menu) {
        menu.classList.toggle("active");
    }
}

// Simple notification
function showMessage(message) {
    let notification = document.getElementById("notification");

    if (!notification) {
        notification = document.createElement("div");
        notification.id = "notification";
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2500);
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
    updateCart();
});
