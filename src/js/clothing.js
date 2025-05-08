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
  fetch("../assets/data.json")
    .then((response) => response.json())
    .then((data) => {
      const clothingContainer = document.querySelector("#clothing-container");

      if (!clothingContainer) {
        console.error("Clothing container not found!");
        return;
      }

      clothingContainer.innerHTML = "";

      data.clothing.forEach((item) => {
        const clothingItem = document.createElement("div");
        clothingItem.classList.add("col");

        clothingItem.innerHTML = `
                    <div class="card shadow-sm">
                        <img src="${item.image_url}" class="card-img-top" alt="${item.product_name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.product_name}</h5>
                            <p class="card-text"><em>${item.description}</em></p>
                            <p class="card-text"><strong>${item.price}</strong></p>
                            <a href="${item.item_page}" class="btn btn-view">View</a>
                        </div>
                    </div>
                `;

        clothingContainer.appendChild(clothingItem);
      });
    })
    .catch((error) => console.error("Error loading clothing items:", error));
});
