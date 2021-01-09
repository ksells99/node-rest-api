const products = require("../data/products");

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

module.exports = { findAll, findById };
