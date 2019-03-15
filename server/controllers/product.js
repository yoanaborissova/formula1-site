const Product = require('../models/Product');

module.exports = {
  getProducts: (req, res) => {
    Product.find()
      .then((products) => {
        let resProducts = products.sort((a, b) => b.price - a.price)
        res
          .status(200)
          .json({ message: 'Fetched products successfully.', resProducts });
      })
      .catch((error) => {
        res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
      });
  },
  createProduct: (req, res) => {
    const productObj = req.body;
    Product.create(productObj)
      .then((product) => {
        res.status(200)
          .json({
            message: 'Product created successfully!',
            product
          })
      })
      .catch((error) => {
        res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
      });
  },
  productDetails: (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
      .then((product) => {
        res.status(200)
          .json({
            message: 'Product fetched successfully.',
            product
          })
      })
      .catch((error) => {
        res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
      });
  },
  editProduct: (req, res) => {
    const productId = req.params.id;

    Product.findById(productId)
      .then((product) => {
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.imageUrl = req.body.imageUrl;

        product.save()
          .then(() => {
            res.status(200)
              .json({
                message: 'Product edited successfully.',
                product,
              })
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        throw error;
      });
  },
  deleteProduct: (req, res) => {
    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
      .then(() => {
        res.status(200)
          .json({
            message: 'Product deleted successfully.',
          })
      })
      .catch((error) => {
        res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
      });
  }
}