const { responseCreator } = require("../utils/utils");
const Order = require("../schemas/order.schema");
const { request } = require("http");

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

        const orders = await Order.find().populate("userId", { fullName: 1, email: 1, surname: 1 }).populate("products.product", { name: 1, description: 1, image: 1 }); //Me busca un id con el que haya guardado en la coleccion de usuarios. Para que me traiga los nombres de mail y email en vez de un id
        console.log(orders)

        if (!orders) {
            return responseCreator(res, 404, "No se encontraron ordenes");
        }
        return responseCreator(res, 200, "Ordenes obtenidas correctamente", { orders })

    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, "No se pudieron obtener ordenes",)
    }

}
async function getOrdersById(req, res) {
    // responseCreator(res, 200, "Orden obtenida correctamente");
    try {
        const id =req.params.id;
        const order = await Order.findById(id).populate("userId", { fullName: 1, email: 1, surname: 1 }).populate("products.product", { name: 1, description: 1, image: 1 })
        //SI NO TENGO ORDEN DEVUELVO UN 404
        if (!order) {
            return res.status(400).send({
                msg: "No devolvio una orden"
            })
        }
        return responseCreator(res, 200,"Ordern obtenid correctamente", {order})
    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, "No se pudo obtener orden")
    }

}

async function updateOrders(req, res) {
    responseCreator(res, 200, "Orden actualizada correctamente");
}

async function deleteOrders(req, res) {
    responseCreator(res, 200, "Orden eliminada correctamente");
}

async function getUserOrders(req, res){
    const usrId=req.params.id;

    const userOrders = await Order.find({userId: usrId}).populate("userId", { fullName: 1, email: 1, surname: 1 }).populate("products.product", { name: 1, description: 1, image: 1 });

    responseCreator(res, 200, `Ordenes del usuario ${userOrders[0].userId.fullName} obtenidas correctamente`, {userOrders})


}

//EXPORTO LOS ENDPOINTS

module.exports = {
    createOrder,
    getOrders,
    getOrdersById,
    updateOrders,
    deleteOrders,
    getUserOrders

}