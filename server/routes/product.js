const router = require('express').Router();
const productController = require('../controllers/product');
const restrictedPages = require('../middleware/restrictedPages');

router.get('/products', productController.getProducts);
router.post('/product/create', restrictedPages.isAdmin, productController.createProduct);
router.get('/product/details/:id', productController.productDetails);
router.post('/product/edit/:id', restrictedPages.isAdmin, productController.editProduct);
router.post('/product/delete/:id', restrictedPages.isAdmin, productController.deleteProduct);

module.exports = router;