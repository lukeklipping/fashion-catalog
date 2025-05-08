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
      const lookbookContainer = document.querySelector(
        "#lookbook-container .row"
      );

      if (!lookbookContainer) {
        console.error("Lookbook container not found!");
        return;
      }

      lookbookContainer.innerHTML = ""; // Clear previous content

      data.lookbook.forEach((outfit) => {
        const outfitCard = document.createElement("div");
        outfitCard.classList.add("col-md-6", "mb-4");

        outfitCard.innerHTML = `
                    <div class="card lookbook-card shadow-sm">
                        <div class="row">
                            <div class="col-md-4"><img src="${
                              outfit.top_image
                            }" class="img-fluid rounded" alt="Top"></div>
                            <div class="col-md-4"><img src="${
                              outfit.bottom_image
                            }" class="img-fluid rounded" alt="Bottom"></div>
                            <div class="col-md-4"><img src="${
                              outfit.accessory_image
                            }" class="img-fluid rounded" alt="Accessory"></div>
                        </div>
                        <div class="card-body text-center">
                            <h4 class="card-title">${outfit.title}</h4>
                            <p class="lookbook-description">${
                              outfit.description
                            }</p>
                            <h5 class="mt-3"><strong>Items in this look:</strong></h5>
                            <ul class="lookbook-items">
                                ${outfit.items
                                  .map((item) => `<li>${item}</li>`)
                                  .join("")}
                            </ul>
                            <button class="btn favorite-btn" data-title="${
                              outfit.title
                            }">❤️ Favorite</button>
                        </div>
                    </div>
                `;

        lookbookContainer.appendChild(outfitCard);
      });

      // Add event listeners to favorite buttons
      document.querySelectorAll(".favorite-btn").forEach((button) => {
        button.addEventListener("click", function () {
          let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          const outfitTitle = this.getAttribute("data-title");

          const outfit = data.lookbook.find((o) => o.title === outfitTitle);

          if (!outfit) return;

          if (favorites.some((fav) => fav.title === outfit.title)) {
            // Remove from favorites
            favorites = favorites.filter((fav) => fav.title !== outfit.title);
            this.innerText = "❤️ Favorite";
          } else {
            // Add to favorites
            favorites.push(outfit);
            this.innerText = "✔ Favorited";
          }

          localStorage.setItem("favorites", JSON.stringify(favorites));
        });
      });
    })
    .catch((error) => console.error("Error loading lookbook:", error));
});
