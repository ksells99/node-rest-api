// Import http module
const http = require("http");
const { getProducts, getProduct } = require("./controllers/productController");

// Create server and define port
const server = http.createServer((req, res) => {
  // Check URL requested by user is for products, & was a GET request
  if (req.url === "/api/products" && req.method === "GET") {
    //   Call function on product controller to get products
    getProducts(req, res);

    // Else check if requesting specific ID (/api/products/:id)
  } else if (
    req.url.match(/\/api\/products\/([a-z0-9-]+)/) &&
    req.method === "GET"
  ) {
    // Split URL into array - get 3rd index (/id)
    const id = req.url.split("/")[3];
    getProduct(req, res, id);

    //
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
