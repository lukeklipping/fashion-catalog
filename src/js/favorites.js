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
  const favoritesContainer = document.querySelector("#favorites-container");

  if (!favoritesContainer) {
    console.error("Favorites container not found!");
    return;
  }

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    favoritesContainer.innerHTML =
      "<p class='text-center'>No favorites yet. Browse the lookbook to add your favorite outfits!</p>";
    return;
  }

  favoritesContainer.innerHTML = ""; // Clear previous content

  favorites.forEach((outfit) => {
    let itemsList = "<ul>";
    outfit.items.forEach((item) => {
      itemsList += `<li>${item}</li>`;
    });
    itemsList += "</ul>";

    const outfitCard = document.createElement("div");
    outfitCard.classList.add("card", "shadow-sm", "p-3", "mb-4");

    outfitCard.innerHTML = `
            <div class="text-center">
                <h3 class="outfit-title">${outfit.title}</h3>
                <p class="outfit-description">${outfit.description}</p>
            </div>
            <div class="row">
                <div class="col-md-4 text-center">
                    <img src="${outfit.top_image}" class="img-fluid rounded" alt="Top">
                </div>
                <div class="col-md-4 text-center">
                    <img src="${outfit.bottom_image}" class="img-fluid rounded" alt="Bottom">
                </div>
                <div class="col-md-4 text-center">
                    <img src="${outfit.accessory_image}" class="img-fluid rounded" alt="Accessory">
                </div>
            </div>
            <div class="card-body text-center">
                <h6><strong>Items in this look:</strong></h6>
                ${itemsList}
            </div>
        `;

    favoritesContainer.appendChild(outfitCard);
  });
});
