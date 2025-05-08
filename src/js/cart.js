document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.querySelector("#searchBar");
  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const searchInput = document.querySelector("input");
      const searchTerm = searchInput.value.trim();

      if (searchTerm) {
        window.location.href = `../html/search.html?search=${encodeURIComponent(
          searchTerm
        )}`;
      }
    });
  }

  displayCart();
});

function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsContainer = document.getElementById("cart-items");
  let cartTotal = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      "<tr><td colspan='6' class='text-center'>Your cart is empty</td></tr>";
    cartTotal.textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {
    let price = parseFloat(item.price);
    let itemTotal = price * item.quantity;
    total += itemTotal;

    let row = document.createElement("tr");
    row.innerHTML = `
          <td><img src="${item.image}" width="50"></td>
          <td>${item.name} ${item.size ? "(Size: " + item.size + ")" : ""}</td>
          <td>$${price.toFixed(2)}</td>
          <td>
              <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
              <span id="quantity-${index}">${item.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
          </td>
          <td>$${itemTotal.toFixed(2)}</td>
          <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button></td>
      `;

    cartItemsContainer.appendChild(row);
  });

  cartTotal.textContent = total.toFixed(2);
}

// Function to update quantity
function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity + change > 0) {
    cart[index].quantity += change;
  } else {
    cart.splice(index, 1); // Remove if quantity goes below 1
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Function to remove an item
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Function to clear cart
function clearCart() {
  localStorage.removeItem("cart");
  displayCart();
}

// Function to simulate checkout
function checkout() {
  if (JSON.parse(localStorage.getItem("cart")).length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase!");
  clearCart();
}
