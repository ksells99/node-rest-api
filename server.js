// Import http module
const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");

// Create server and define port
const server = http.createServer((req, res) => {
  // Check URL requested by user is for products, & was a GET request
  if (req.url === "/api/products" && req.method === "GET") {
    //   Call function on product controller to get products
    getProducts(req, res);

    // Else check if requesting specific ID via regex (/api/products/:id)
  } else if (
    req.url.match(/\/api\/products\/([a-z0-9-]+)/) &&
    req.method === "GET"
  ) {
    // Split URL into array to get ID - get 3rd index (/id)
    const id = req.url.split("/")[3];
    getProduct(req, res, id);

    // Else check for POST req for new product
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);

    // Else check for PUT req & specific ID - to update product
  } else if (
    req.url.match(/\/api\/products\/([a-z0-9-]+)/) &&
    req.method === "PUT"
  ) {
    // Split URL into array to get ID - get 3rd index (/id)
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);

    // Else check for DELETE req & specific ID - to delete product
  } else if (
    req.url.match(/\/api\/products\/([a-z0-9-]+)/) &&
    req.method === "DELETE"
  ) {
    // Split URL into array to get ID - get 3rd index (/id)
    const id = req.url.split("/")[3];
    deleteProduct(req, res, id);

    // Else return route not found error
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
