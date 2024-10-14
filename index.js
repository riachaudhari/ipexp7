const express = require('express');
const path = require('path');
const app = express();
const { products } = require('./data');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Product list API
app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

// Product detail page route
app.get('/api/products/:productID', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

// Product detail API (for fetching product data)
app.get('/api/product-details/:productID', (req, res) => {
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProduct) {
    return res.status(404).send('Product Does Not Exist');
  }
  return res.json(singleProduct);
});

// Start server
app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});