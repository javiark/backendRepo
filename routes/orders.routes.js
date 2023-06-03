const express = require("express");
const router = express.Router();
const ordersController=require("../controllers/order.controllers")

//Get all orders
router.get("/orders", ordersController.getOrders);

//Get order by ID
router.get("/orders/:id", ordersController. getOrdersById);

//Get user orders. Busco las ordenes de un usuario
router.get("/orders/user/:id", ordersController.getUserOrders);

//Create order
router.post("/orders", ordersController.createOrder);

//Update order
// router.put("/orders/:id", ordersController.updateOrders);

//Delete order
router.delete("/orders/:id", ordersController.deleteOrders);

module.exports = router