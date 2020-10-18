// Bringing http module (it comes with node.js)
const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("./controllers/productController");

// Takes REQuest and RESponce. When make a request to the server, will have an acces to requast and responce objects
const server = http.createServer((req, res) => {
  // If url is right and request method is GET
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
    // Will use regExp to check matching
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    //   Will split by the '/'. Eg. 'api/products/1' will be split into ['api', 'products', '1']
    const id = req.url.split("/")[3];
    getProduct(req, res, id);
    // To create a product. Using POST request.
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);
    // To update product
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateProduct(req, res, id)

  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteProduct(req, res, id)

  }
  
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

// To get a specific product by its ID

// First checks for environment variable
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
