const Product = require("../models/productModel");
const { getPostData } = require("../utils");

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
    // Find product from product model (from json file) based on ID passed in (from URL) - calls findbyId on model
    const product = await Product.findById(id);

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

// @desc    Add new product
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    // Call getPostData function from utils.js file - pass in request (i.e. user's input) - this then converts req to body data and returns it
    const body = await getPostData(req);

    // Destructure body data to get title/desc/price
    const { title, description, price } = JSON.parse(body);

    // Create new product and pass in body data
    const product = {
      title,
      description,
      price,
    };

    // Call create function on model, pass in product
    const newProduct = await Product.create(product);

    // Return new product
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));

    //
  } catch (error) {
    console.log(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
const updateProduct = async (req, res, id) => {
  try {
    // Find product from DB based on ID
    const product = await Product.findById(id);

    // If product doesn't exist, send error
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));

      // Else if product found...
    } else {
      // Call getPostData function from utils.js file - pass in request (i.e. user's input) - this then converts req to body data and returns it
      const body = await getPostData(req);

      // Destructure body data to get title/desc/price
      const { title, description, price } = JSON.parse(body);

      // Create var containing updated product data - if field not specified in request, just use existing values
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      // Call update function on model, pass in ID & updated product
      const updProduct = await Product.update(id, productData);

      // Return updated product
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updProduct));
    }

    //
  } catch (error) {
    console.log(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res, id) => {
  try {
    // Find product from product model (from json file) based on ID passed in (from URL) - calls findbyId on model
    const product = await Product.findById(id);

    //   If product doesn't exist, send error
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));

      //   Else if found, call remove function on model to delete the product - pass in ID
    } else {
      await Product.remove(id);

      // Send 200 response & msg to say successful
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: `Product ${id} has been successfully deleted`,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
