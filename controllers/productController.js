const Product = require("../models/productModel");

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    // Find all products from product model (from json file)
    const products = await Product.findAll();

    // Define headers and send back JSON products
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
};

// @desc    Get product by ID
// @route   GET /api/product/id
const getProduct = async (req, res, id) => {
  try {
    // Find product from product model (from json file) based on ID passed in (from URL)
    const product = await Product.findById(id);
    console.log(product);

    //   If product doesn't exist, send error
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));

      //   Else send product
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
};
