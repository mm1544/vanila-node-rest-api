/* 
Models deal with data. These f-ions will be used to create/get/update/delete data. 
Controllers will control what particular route is doing: what status and content it's sending back. Controllers 
will interact with the models to get the data.
*/

// Importing data
let products = require("../data/products.json");
// Bringing in uuid to generate ids
const { v4: uuidv4 } = require("uuid");

const { writeDataToFile } = require("../utils");

// Model functions will return a promise (when data is fetched the promise should be returned)
function findAll() {
  // Promise is taking a function with a 'resolve' and 'reject'
  return new Promise((resolve, reject) => {
    //   Need to 'resolve' the promise
    resolve(products);
  });
}

// Finds a single product by its ID
function findById(id) {
  // Promise is taking a function with a 'resolve' and 'reject'
  return new Promise((resolve, reject) => {
    //   '(p) => p.id === id': for passed in 'p' product want to find the one product whose p.id is equal passed id.
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
}

// Creates a product
function create(product) {
  return new Promise((resolve, reject) => {
    // '...' - spread operator, it will spread across all what is in the 'product'
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    // To write to the JSON file will use a custom utility function
    writeDataToFile("./data/products.json", products);
    // Want to send back a 'newProduct'
    resolve(newProduct);
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    //   Find index in JS obj. array of the right product
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };
    // To write to the JSON file will use a custom utility function
    writeDataToFile("./data/products.json", products);
    // Want to send back an updated product
    resolve(products[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id);
    // To write to the JSON file will use a custom utility function
    writeDataToFile("./data/products.json", products);
    // Don't want resolve anything
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};
