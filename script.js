// JavaScript-kode for å hente og vise produkter
const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");
const searchInput = document.getElementById("search-input");
const navLinks = document.querySelector(".nav-links");

let allProducts = [];

// Initial henting og visning av produkter
function fetchProducts() {
  fetch('https://crudcrud.com/api/a805348230754af7a64e1f28d46fd804/products')
    .then(response => response.json())
    .then(data => {
      allProducts = data;
      displayProducts(data);
    })
    .catch(error => {
      console.error('Feil ved henting av produkter:', error);
    });
}

// Funksjon for å vise produkter
function displayProducts(products) {
  productList.innerHTML = '';
  products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Price: $${product.price}</p>
      <p>Category: ${product.category}</p>
      <p>${product.description.slice(0, 100)}...</p>
      <button onclick="viewProductDetails('${product._id}')">Vis detaljer</button>
      <button onclick="openEditForm('${product._id}')">Rediger</button>
      <button onclick="deleteProduct('${product._id}')">Slett</button>
    `;
    productList.appendChild(productElement);
  });
}

// Håndterer innsending av skjemaet for å legge til nytt produkt
document.getElementById('add-product-form').addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newProduct = {
    title: formData.get('title'),
    price: parseFloat(formData.get('price')),
    image: formData.get('image'),
    description: formData.get('description'),
    category: formData.get('category')
  };

  addProduct(newProduct);
  event.target.reset();
});



// Legger til et nytt produkt
function addProduct(product) {
  fetch('https://crudcrud.com/api/a805348230754af7a64e1f28d46fd804/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })
  .then(response => response.json())
  .then(() => fetchProducts())
  .catch(error => console.error('Feil ved tillegging av produkt:', error));
}

// Oppdaterer et eksisterende produkt
function updateProduct(productId, updatedProduct) {
  fetch(`https://crudcrud.com/api/a805348230754af7a64e1f28d46fd804/products/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedProduct)
  })
  .then(() => fetchProducts())
  .catch(error => console.error('Feil ved oppdatering av produkt:', error));
}

// Sletter et produkt
function deleteProduct(productId) {
  fetch(`https://crudcrud.com/api/a805348230754af7a64e1f28d46fd804/products/${productId}`, {
    method: 'DELETE'
  })
  .then(() => fetchProducts())
  .catch(error => console.error('Feil ved sletting av produkt:', error));
}

// Åpner redigeringsform for et produkt
function openEditForm(productId) {
  const product = allProducts.find(p => p._id === productId);
  const modal = document.getElementById('editModal');
  const form = document.getElementById('editForm');
  form.innerHTML = `
    <input type="text" name="title" value="${product.title}" />
    <input type="number" name="price" value="${product.price}" />
    <input type="text" name="image" value="${product.image}" />
    <textarea name="description">${product.description}</textarea>
    <select name="category">
      <option value="men's clothing" ${product.category === "men's clothing" ? 'selected' : ''}>Men's Clothing</option>
      <option value="women's clothing" ${product.category === "women's clothing" ? 'selected' : ''}>Women's Clothing</option>
      <option value="jewelery" ${product.category === "jewelery" ? 'selected' : ''}>Jewelery</option>
      <option value="electronics" ${product.category === "electronics" ? 'selected' : ''}>Electronics</option>
    </select>
    <button type="submit">Lagre</button>
    <button type="button" onclick="closeEditForm()">Avbryt</button>
  `;
  modal.style.display = 'block';

  form.onsubmit = function(event) {
    event.preventDefault();
    updateProduct(productId, {
      title: form.title.value,
      price: parseFloat(form.price.value),
      image: form.image.value,
      description: form.description.value,
      category: form.category.value
    });
    closeEditForm();
  };
}

//Lukker redigeringsform
function closeEditForm() {
  document.getElementById('editModal').style.display = 'none';
}

// Viser produkt detaljer
function viewProductDetails(productId) {
  window.location.href = `product-details.html?productId=${productId}`;
}

//kategori og søk filtrering
categoryFilter.addEventListener('change', () => {
  const selectedCategory = categoryFilter.value;
  const filteredProducts = selectedCategory
    ? allProducts.filter(product => product.category === selectedCategory)
    : allProducts;
  displayProducts(filteredProducts);
});

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
});

//kaller initial funksjon når siden lastes
document.addEventListener('DOMContentLoaded', fetchProducts);

