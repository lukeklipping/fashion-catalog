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
  localStorage.removeItem("favorites");

  fetch("../assets/data.json")
    .then((response) => response.json())
    .then((data) => {
      const carouselInner = document.querySelector(".carousel-inner");
      const indicators = document.querySelector(".carousel-indicators");

      if (!carouselInner || !indicators) {
        console.error("Carousel elements not found!");
        return;
      }

      carouselInner.innerHTML = "";
      indicators.innerHTML = "";

      data.homepage.forEach((item, index) => {
        // Create carousel item
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) carouselItem.classList.add("active");

        carouselItem.innerHTML = `
                    <img src="${item.image_url}" class="d-block w-100" alt="${item.product_name}">
                    <div class="carousel-caption">
                        <h5>${item.product_name}</h5>
                        <p><em>${item.description}</em></p>
                        <p><strong>${item.price}</strong></p>
                    </div>
                `;

        carouselInner.appendChild(carouselItem);

        // Create carousel indicators
        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
        indicator.setAttribute("data-bs-slide-to", index);
        indicator.setAttribute("aria-label", `Slide ${index + 1}`);
        if (index === 0) indicator.classList.add("active");

        indicators.appendChild(indicator);
      });

      // Initialize Bootstrap Carousel AFTER content is added
      new bootstrap.Carousel(
        document.querySelector("#carouselExampleIndicators")
      );
    })
    .catch((error) => console.error("Error loading carousel images:", error));
});

// Ensure Bootstrap carousel controls work correctly
document
  .querySelectorAll(".carousel-control-prev, .carousel-control-next")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const carousel = document.querySelector("#carouselExampleIndicators");
      const carouselInstance = new bootstrap.Carousel(carousel);
      if (button.classList.contains("carousel-control-prev")) {
        carouselInstance.prev();
      } else {
        carouselInstance.next();
      }
    });
  });
