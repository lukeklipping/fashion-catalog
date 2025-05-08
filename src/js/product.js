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

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product_id");

  if (!productId) {
    document.body.innerHTML = "<h1>Product not found</h1>";
    return;
  }

  fetch("../assets/data.json")
    .then((response) => response.json())
    .then((data) => {
      const product =
        data.clothing?.find((item) => item.product_id === productId) ||
        data.accessories?.find((item) => item.product_id === productId) ||
        data.homepage?.find((item) => item.product_id == productId);

      if (!product) {
        document.body.innerHTML = "<h1>Product not found</h1>";
        return;
      }

      // Populate product details
      document.getElementById("product-image").src = product.image_url;
      document.getElementById("product-name").innerText = product.product_name;
      document.getElementById("product-description").innerText =
        product.description;
      document.getElementById("product-price").innerText = product.price;

      // Event listener for "Add to Shopping Cart"
      document
        .getElementById("add-to-cart")
        .addEventListener("click", function () {
          const sizeSelect = document.getElementById("size-select");
          const selectedSize = sizeSelect ? sizeSelect.value : "One Size";

          addToCart(product, selectedSize);
        });
    })
    .catch((error) => console.error("Error loading product details:", error));
});

// Updated function to properly add to cart with quantity
function addToCart(product, size) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingItem = cart.find(
    (item) => item.id === product.product_id && item.size === size
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.product_id,
      name: product.product_name,
      price: parseFloat(product.price.replace("$", "")), // Ensure numeric price
      image: product.image_url,
      size: size,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.product_name} (Size: ${size}) has been added to the cart!`);
}

// Function to submit a review
function submitReview() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product_id");
  const reviewText = document.getElementById("review-text").value.trim();

  if (!reviewText) {
    alert("Please write a review before submitting.");
    return;
  }

  let reviews = JSON.parse(localStorage.getItem("reviews")) || {};

  if (!reviews[productId]) {
    reviews[productId] = [];
  }

  reviews[productId].push(reviewText);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  document.getElementById("review-text").value = "";
  displayReviews(productId);
}

// Function to display reviews
function displayReviews(productId) {
  let reviews = JSON.parse(localStorage.getItem("reviews")) || {};
  let reviewsList = document.getElementById("reviews-list");
  reviewsList.innerHTML = "";

  if (reviews[productId]) {
    reviews[productId].forEach((review) => {
      let reviewElement = document.createElement("p");
      reviewElement.textContent = `📝 ${review}`;
      reviewsList.appendChild(reviewElement);
    });
  } else {
    reviewsList.innerHTML =
      "<p>No reviews yet. Be the first to review this product!</p>";
  }
}

// Load reviews when page loads
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product_id");
  displayReviews(productId);
});
