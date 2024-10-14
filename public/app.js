// Fetch products from the API and display them
const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const products = await response.json();
      const productList = document.getElementById('product-list');
  
      products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
  
        // Add "View Details" button with a data attribute for product id
        productItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <button class="view-details" data-id="${product.id}">View Details</button>
        `;
  
        productList.appendChild(productItem);
      });
  
      // Add event listeners to all "View Details" buttons
      const viewDetailsButtons = document.querySelectorAll('.view-details');
      viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          const productId = event.target.getAttribute('data-id');
          fetchProductDetails(productId);
        });
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  // Fetch details of a specific product and display them
  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const product = await response.json();
  
      // Create detailed product view
      const productDetail = document.getElementById('product-detail');
      productDetail.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">
        <p><strong>Price:</strong> $${product.price}</p>
        <p>${product.desc}</p>
        <button id="back-to-list">Back to Products</button>
      `;
  
      // Hide product list and show product detail
      document.getElementById('product-list').style.display = 'none';
      productDetail.style.display = 'block';
  
      // Add event listener to the "Back to Products" button
      document.getElementById('back-to-list').addEventListener('click', () => {
        productDetail.style.display = 'none';
        document.getElementById('product-list').style.display = 'flex';
      });
  
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  
  // Call the function to fetch and display products on page load
  fetchProducts();