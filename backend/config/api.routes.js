// todo/backend/config/api.routes.js
var Purchasing = require('../controllers/api/purchasing_controller.js');
var Order = require('../controllers/api/order_controller.js');
var Product = require('../controllers/api/product_controller.js')

module.exports = function(router) {
  router.get('/purchasing/:productId', Purchasing.index);
  router.get('/order/:employeeId', Order.index);
  router.get('/product', Product.index);
}