document.addEventListener("DOMContentLoaded", () => {
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
      const authorContainer = document.querySelector("#author-container");

      if (!authorContainer) {
        console.error("Author container not found");
        return;
      }

      authorContainer.innerHTML = ""; // Clear previous content

      data.authors.forEach((author) => {
        const authorCard = document.createElement("div");
        authorCard.classList.add("col-md-4", "mb-4");

        authorCard.innerHTML = `
                    <div class="card text-center shadow-sm">
                        <img src="../assets/${author.author_img}" alt="${author.name}" class="card-img-top author-img">
                        <div class="card-body">
                            <h5 class="card-title">${author.name}</h5>
                            <p class="card-text">${author.netid}</p>
                            <p class="class-text"><strong>Class:</strong> ${author.class_name}</p>
                            <p class="date-text"><strong>Date:</strong> ${author.date}</p>
                            </div>
                        </div>
                    </div>
                `;

        authorContainer.appendChild(authorCard);
      });
    })
    .catch((error) => console.error("Error fetching author data:", error));
});
