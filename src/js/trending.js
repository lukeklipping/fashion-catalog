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
      const trendingContainer = document.querySelector("#trending-container");

      if (!trendingContainer) {
        console.error("Trending container not found!");
        return;
      }

      trendingContainer.innerHTML = "";

      data.trending.forEach((item) => {
        const trendingItem = document.createElement("div");
        trendingItem.classList.add("col");

        trendingItem.innerHTML = `
                    <div class="card shadow-sm">
                        <img src="${item.image_url}" class="card-img-top" alt="${item.product_name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.product_name}</h5>
                            <p class="card-text"><em>${item.description}</em></p>
                        </div>
                    </div>
                `;

        trendingContainer.appendChild(trendingItem);
      });
    })
    .catch((error) => console.error("Error loading trending items:", error));
});
