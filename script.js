// JavaScript-kode for å hente og vise produkter
const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");
const searchInput = document.getElementById("search-input");
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

// Hent produktdata fra API
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    // Vis alle produkter ved lasting av siden
    displayProducts(data);

    // Håndter filtreringsendringer
    categoryFilter.addEventListener("change", () => {
      const selectedCategory = categoryFilter.value;
      const filteredProducts = selectedCategory
        ? data.filter((product) => product.category === selectedCategory)
        : data;
      displayProducts(filteredProducts);
    });

    // Håndter søk
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredProducts = data.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
      displayProducts(filteredProducts);
    });
  })
  .catch((error) => {
    console.log("Feil ved henting av produktdata:", error);
  });

// Funksjon for å vise produkter
function displayProducts(products) {
  productList.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.title;

    const productName = document.createElement("h3");
    productName.textContent = product.title;

    const productPrice = document.createElement("p");
    productPrice.textContent = `Price: $${product.price}`;

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description.slice(0, 100) + "...";

    const detailsButton = document.createElement("button");

    detailsButton.textContent = "Vis detaljer";
    function viewProductDetails(productId) {
      window.location.href = `product-details.html?productId=${productId}`;
    }

    detailsButton.onclick = function () {
      viewProductDetails(product.id); // Assuming 'product' is in scope and has an 'id' property
    };

    productElement.appendChild(productImage);
    productElement.appendChild(productName);
    productElement.appendChild(productPrice);
    productElement.appendChild(productDescription);
    productElement.appendChild(detailsButton);

    productList.appendChild(productElement);
  });
}

// Funksjon for å håndtere responsiv meny
function toggleMenu() {
  navLinks.classList.toggle("nav-active");
  burger.classList.toggle("toggle");
}

// Lytt etter klikk på burger-menyen
burger.addEventListener("click", toggleMenu);
