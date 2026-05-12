const initialCart = [
    { id: 101, name: "Wireless Headphones", price: 120 }
];

function addToCart(...newItems) {

    const updatedCart = [...initialCart, ...newItems];

    const [firstProduct, ...remainingProducts] = updatedCart;

    displayCartInfo(updatedCart, firstProduct);
}

function displayCartInfo(cart, firstProduct) {
    const cartListElement = document.getElementById("cart-list");
    const firstItemElement = document.getElementById("first-item-container");

    firstItemElement.innerHTML = `
        <div class="featured-item">
            <strong>${firstProduct.name}</strong>
            <p>Product ID: ${firstProduct.id} | Price: $${firstProduct.price}</p>
        </div>
    `;

    let cartHTML = "";
    cart.forEach(item => {
        cartHTML += `
            <li class="cart-item">
                <span>${item.name} (ID: ${item.id})</span>
                <span class="item-price">$${item.price}</span>
            </li>
        `;
    });

    cartListElement.innerHTML = cartHTML;
}

addToCart(
    { id: 102, name: "Mechanical Keyboard", price: 85 },
    { id: 103, name: "Ergonomic Mouse", price: 45 },
    { id: 104, name: "USB-C Hub", price: 30 }
);