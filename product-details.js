// JavaScript code to display product details and handle wishlist
const productDetails = document.getElementById('product-details');

// Function to extract product ID from the URL
function getProductIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('productId');
}

const selectedProductId = getProductIdFromUrl();

// Fetch product data from API based on the product ID extracted from URL
fetch(`https://crudcrud.com/api/a805348230754af7a64e1f28d46fd804/products/${selectedProductId}`)
  .then(response => response.json())
  .then(product => {
    // Display product details
    const productElement = document.createElement('div');

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;

    const productName = document.createElement('h2');
    productName.textContent = product.title;

    const productPrice = document.createElement('p');
    productPrice.textContent = `Price: $${product.price}`;

    const productDescription = document.createElement('p');
    productDescription.textContent = product.description;

    const addToWishlistButton = document.createElement('button');
    addToWishlistButton.textContent = 'Add to Wish List';
    addToWishlistButton.onclick = function() {
      addToWishList(product);
    };

    productElement.appendChild(productImage);
    productElement.appendChild(productName);
    productElement.appendChild(productPrice);
    productElement.appendChild(productDescription);
    productElement.appendChild(addToWishlistButton);

    productDetails.appendChild(productElement);
  })
  .catch(error => {
    console.error('Error fetching product details:', error);
    productDetails.textContent = 'Failed to load product details.';
  });

// Function to add product to wish list
function addToWishList(product) {
  // Retrieve wishlist from localStorage or initialize an empty array
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  // Check if the product is already in the wishlist
  if (!wishlist.some(item => item.id === product.id)) {
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert('Product added to your wishlist!');
  } else {
    alert('Product is already in your wishlist.');
  }
}

// Function to go back to the product listing page
function goBack() {
  window.location.href = 'index.html';
}
