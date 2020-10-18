/* 
Controllers will control what particular route is doing: what status and content it's sending back. Controllers 
will interact with the models to get the data.
Models deal with data. These f-ions will be used to create/get/update/delete data. 
*/

// Brings in the model
const Product = require("../models/productModel");

const { getPostData } = require("../utils");

/* 
(Async f-ion because it will call a model-function which returns a promise. Controller functions will take request 
 and responce) 
 */
// @desc    Gets All Products
// @route   GET /api/products
async function getProducts(req, res) {
  try {
    //   Uses 'await' because 'findAll' f. returns a promise
    const products = await Product.findAll();
    // Writes status code and object values within a header
    res.writeHead(200, { "Content-Type": "application/json" });
    // We are bringing in 'products.json' but it will come in as an array of JS objects, therefore need to use
    // JSON.stringify
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single Product
// @route   GET /api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    // Checks if this product exists
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      // Sends back a single product
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Create a Product
// @route   POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);

    // Taking parts from the 'body' and creating a 'product' object
    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Product.create(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Update a Product
// @route   PUT /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const body = await getPostData(req);

      const { title, description, price } = JSON.parse(body);

      // Taking parts from the 'body' and creating a 'productData' object
      const productData = {
        //   Adds a new data of leaves the same old
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updatedProduct = await Product.update(id, productData);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete Product
// @route   DELETE /api/product/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    // Checks if this product exists
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      await Product.remove(id);

      res.writeHead(200, { "Content-Type": "application/json" });
      // Sends back a single product
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
