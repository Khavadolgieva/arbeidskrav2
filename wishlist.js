// JavaScript code to retrieve and display wishlist items
const wishlistDiv = document.getElementById('wishlist');
const wishlistContainer = document.getElementById('wishlist-container');
const clearWishlistButton = document.getElementById('clear-wishlist');
const noWishlist = document.getElementById('no-wishlist');

// Function to load and display the wishlist
function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistContainer.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistDiv.innerHTML = '<p id="no-wishlist" class="no-display">There is no items. please...</p>';
    }

    wishlist.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;

        const productName = document.createElement('h3');
        productName.textContent = product.title;

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => confirmRemoveFromWishlist(product.id);

        productElement.appendChild(productImage);
        productElement.appendChild(productName);
        productElement.appendChild(productPrice);
        productElement.appendChild(removeButton);

        wishlistContainer.appendChild(productElement);
    });
}

// Function to confirm and remove a product from the wishlist
confirmRemoveFromWishlist = function(productId) {
    if (confirm('Are you sure you want to remove this item from your wishlist?')) {
        removeFromWishlist(productId);
    }
};

// Function to remove a product from the wishlist and update storage
function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(product => product.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlist(); // Update the display of the wishlist
    alert('Item was removed from your wishlist.');
}

// Function to clear the entire wishlist
clearWishlistButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
        localStorage.removeItem('wishlist');
        loadWishlist(); // Update the display of the wishlist
        alert('Your wishlist has been cleared.');
    }
});

// Load the wishlist on startup
loadWishlist();
