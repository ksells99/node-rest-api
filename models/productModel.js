let products = require("../data/products");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils");

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    // Find product from JSON file where ID matches
    const product = products.find((product) => product.id === id);
    resolve(product);
  });
};

const create = (product) => {
  return new Promise((resolve, reject) => {
    // Create new product, generate ID and pass in product
    const newProduct = { id: uuidv4(), ...product };

    // Then push new product onto products array
    products.push(newProduct);

    // Then call writeDataToFile function (on utils.js file) to write to JSON - pass in new products array
    writeDataToFile("./data/products.json", products);

    // Send back new product
    resolve(newProduct);
  });
};

const update = (id, product) => {
  return new Promise((resolve, reject) => {
    // Find index of product to update  (i.e. finds first (only) product that matches ID)
    const index = products.findIndex((product) => product.id === id);

    // On this product in the products array, update and pass in new product data
    products[index] = { id, ...product };

    // Then call writeDataToFile function (on utils.js file) to write to JSON - pass in updated products array
    writeDataToFile("./data/products.json", products);

    // Send back updated product
    resolve(products[index]);
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    // Update products array to filter out/remove the product
    products = products.filter((product) => product.id !== id);

    // Then call writeDataToFile function (on utils.js file) to write to JSON - pass in updated products array
    writeDataToFile("./data/products.json", products);

    resolve();
  });
};

module.exports = { findAll, findById, create, update, remove };
