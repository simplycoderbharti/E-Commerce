// Load the cart data from localStorage when the page loads
let cart = JSON.parse(localStorage.getItem("cart")) || {};

function addToCart(itemName, price) {
    if (cart[itemName]) {
        cart[itemName].quantity += 1;
    } else {
        cart[itemName] = {
            price: price,
            quantity: 1
        };
    }

    // Update the cart data in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
}

function removeFromCart(itemName) {
    if (cart[itemName]) {
        if (cart[itemName].quantity === 1) {
            delete cart[itemName];
        } else {
            cart[itemName].quantity -= 1;
        }

        // Update the cart data in localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    updateCart();
}
