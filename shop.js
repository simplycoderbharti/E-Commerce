let cart = JSON.parse(localStorage.getItem("cart"))

function addToCart(itemName, price) {
    if (cart[itemName]) {
        cart[itemName].quantity += 1;
    } else {
        cart[itemName] = {
            price: price,
            quantity: 1
        };
    }
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

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    updateCart();
}


function updateCart() {
    const cartContainer = document.querySelector(".cart");
    const totalContainer = document.getElementById("total-price");
    cartContainer.innerHTML = "";

    let total = 0;

    for (const item in cart) {
        const { price, quantity } = cart[item];

        const cartItem = document.createElement("div");
        cartItem.classList.add("item");

        cartItem.innerHTML = `
            <h2>${item}</h2>
            <p>Price: $${price}</p>
            <p>Quantity: <span id="quantity-${item}">${quantity}</span></p>
            <button class="remove-from-cart" onclick="removeFromCart('${item}')">Remove</button>
            <button class="increase-quantity" onclick="increaseQuantity('${item}')">+</button>
            <button class="decrease-quantity" onclick="decreaseQuantity('${item}')">-</button>
        `;

        cartContainer.appendChild(cartItem);

        total += price * quantity;
    }

    totalContainer.textContent = `$${total.toFixed(2)}`;
}



function increaseQuantity(itemName) {
    if (cart[itemName]) {
        cart[itemName].quantity += 1;

        // Update the cart data in localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update the quantity in the UI
        const quantityElement = document.getElementById(`quantity-${itemName}`);
        quantityElement.textContent = cart[itemName].quantity;

        // Recalculate and update the total price
        updateCart();
    }
}


function decreaseQuantity(itemName) {
    if (cart[itemName] && cart[itemName].quantity > 1) {
        cart[itemName].quantity -= 1;

        // Update the cart data in localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update the quantity in the UI
        const quantityElement = document.getElementById(`quantity-${itemName}`);
        quantityElement.textContent = cart[itemName].quantity;

        // Recalculate and update the total price
        updateCart();
    }
}

updateCart();

