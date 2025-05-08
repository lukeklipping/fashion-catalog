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
      const accessContainer = document.querySelector("#accessories-container");

      if (!accessContainer) {
        console.error("Accessories container not found!");
        return;
      }

      accessContainer.innerHTML = "";

      data.accessories.forEach((item) => {
        const accessItem = document.createElement("div");
        accessItem.classList.add("col");

        accessItem.innerHTML = `
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

        accessContainer.appendChild(accessItem);
      });
    })
    .catch((error) => console.error("Error loading accessories items:", error));
});
