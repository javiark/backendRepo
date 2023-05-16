const {responseCreator } = require("../utils/utils");
const Order = require("../schemas/order.model.js")

//CREO TODOS LOS ENDPOINTS

async function createOrder(req, res){ // se hace async pq pide algo del backend
    responseCreator(res, 200, "Orden creada correctamente");
} 

async function getOrders(req, res){ 
    responseCreator(res, 200, "Orden obtenida correctamente");
} 
async function getOrdersById(req, res){ 
    responseCreator(res, 200, "Orden obtenida correctamente");
} 

async function updateOrders(req, res){ 
    responseCreator(res, 200, "Orden actualizada correctamente");
} 

async function deleteOrders(req, res){ 
    responseCreator(res, 200, "Orden eliminada correctamente");
} 

//EXPORTO LOS ENDPOINTS

module.exports={
    createOrder,
    getOrders,
    getOrdersById,
    updateOrders,
    deleteOrders

}