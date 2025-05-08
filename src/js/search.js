document.addEventListener("DOMContentLoaded", function () {
  // Get the search query from URL
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("query")?.toLowerCase() || "";

  // Fetch product data
  fetch("../assets/data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("Loaded products:", data); // Debugging
      const products = [
        ...data.clothing,
        ...data.accessories,
        ...data.homepage,
      ];
      console.log("Filtered Products to Search:", products); // Debugging
      displaySearchResults(products, searchTerm);
    })
    .catch((error) => console.error("Error loading products:", error));
});

function displaySearchResults(products, searchTerm) {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = ""; // Clear previous results

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm)
  );

  if (filteredProducts.length === 0) {
    resultsContainer.innerHTML = `<p class="no-results">No products found for "${searchTerm}".</p>`;
    return;
  }

  // Display search results in a grid format
  const resultsGrid = document.createElement("div");
  resultsGrid.classList.add("results-grid");

  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
        <img src="${product.image_url}" alt="${
      product.product_name
    }" class="product-img" width="100px">
        <div class="product-info">
          <h5 class="product-title">${highlightMatch(
            product.product_name,
            searchTerm
          )}</h5>
          <p class="product-price">${product.price}</p>
          <a href="${
            product.item_page
          }" class="btn btn-primary">View Details</a>
        </div>
      `;
    resultsGrid.appendChild(productCard);
  });

  resultsContainer.appendChild(resultsGrid);
}

// Escape special characters in the search term before using it in the regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Highlight search term in product names
function highlightMatch(text, term) {
  if (!term) return text;
  const safeTerm = escapeRegExp(term); // Escape special characters
  const regex = new RegExp(`(${safeTerm})`, "gi");
  return text.replace(regex, `<span class="highlight">$1</span>`);
}
