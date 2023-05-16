const { responseCreator } = require("../utils/utils");
const Order = require("../schemas/order.schema")

//CREO TODOS LOS ENDPOINTS

async function createOrder(req, res) { // se hace async pq pide algo del backend
    // console.log(req.body);
    try {
        const body = req.body;

        const data = new Order(body);

        const newOrder = await data.save();

        responseCreator(res, 200, "Orden creada correctamente", { newOrder });

    } catch (error) {
        console.log(error)
        responseCreator(res, 500, "No se pudo crear la orden");
    }

}



async function getOrders(req, res) {
    // responseCreator(res, 200, "Orden obtenida correctamente");
    try {

        const orders= await Order.find().populate("userId",{fullName:1, email:1, surname: 1}).populate("products.productId",{name:1, description:1, image:1}); //Me busca un id con el que haya guardado en la coleccion de usuarios. Para que me traiga los nombres de mail y email en vez de un id

        if(!orders){
           return responseCreator(res, 404, "No se encontraron ordenes");
        }
        return responseCreator(res,200,"Ordenes obtenidas correctamente", {orders})

    } catch (error) {
        console.log(error);
        return responseCreator(res, 500,"No se pudieron obtener ordenes" ,)
    }

}
async function getOrdersById(req, res) {
    responseCreator(res, 200, "Orden obtenida correctamente");
}

async function updateOrders(req, res) {
    responseCreator(res, 200, "Orden actualizada correctamente");
}

async function deleteOrders(req, res) {
    responseCreator(res, 200, "Orden eliminada correctamente");
}

//EXPORTO LOS ENDPOINTS

module.exports = {
    createOrder,
    getOrders,
    getOrdersById,
    updateOrders,
    deleteOrders

}