const router = require('express').Router();
const orderController = require('../controllers/order');
const restrictedPages = require('../middleware/restrictedPages')

router.get('/orders', restrictedPages.isAdmin, orderController.getOrders);
router.post('/order/create', restrictedPages.isAuthed, orderController.createOrder);
router.post('/order/status/:id', restrictedPages.isAdmin, orderController.changeOrderStatus);
router.get('/orders/:user', restrictedPages.isOwner, orderController.getUserOrders);

module.exports = router;