const Order = require('../models/Order');

module.exports = {
  getOrders: (req, res) => {
    Order.find()
      .then((orders) => {
        let resOrders = orders.sort((a, b) => b.date - a.date)
        res
          .status(200)
          .json({ message: 'Fetched orders successfully.', resOrders });
      })
      .catch((error) => {
        res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
      });
  },
  createOrder: (req, res) => {
    const orderObj = req.body;
    Order.create(orderObj)
      .then((order) => {
        res.status(200)
          .json({
            message: 'Successfully ordered!',
            order
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
  changeOrderStatus: (req, res) => {
    const orderId = req.params.id;

    Order.findById(orderId)
      .then((order) => {
        order.status = req.body.status;

        order.save()
          .then(() => {
            res.status(200)
              .json({
                message: 'Status changed!',
                order,
              })
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
  getUserOrders: (req, res) => {
    Order.find({user: req.params.user})
      .then((orders) => {
        let resOrders = orders.sort((a, b) => b.date - a.date)
        res
          .status(200)
          .json({ message: 'Fetched orders successfully.', resOrders });
      })
      .catch((error) => {
        res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
      });
  },
}