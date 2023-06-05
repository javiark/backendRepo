const { responseCreator } = require("../utils/utils");
const Order = require("../schemas/order.schema");
// const { request } = require("http");st

//CREO TODOS LOS ENDPOINTS

async function createOrder(req, res) { // se hace async pq pide algo del backend
    // console.log(req.body);
    try {
        const order = new Order(req.body)
        await order.save()
        // const body = req.body;

        // const data = new Order(body);
        // data.totalPrice = await verifyOrderAndCalculate(req.body.products);

        // const newOrder = await data.save();

        responseCreator(res, 200, "Orden creada correctamente");

    } catch (error) {
        console.log(error)
        responseCreator(res, 500, "No se pudo crear la orden");
    }

}


// const addOrder = async (req,res) => {
//     try {
//         const order = new Order(req.body)
//         await order.save()
//         res.status(200).send('Orden añadida correctamente');
//     } catch (error) {
//         res.status(500).send({
//             msg: 'La orden no se pudo guardar',
//             error: error
//         });
//         console.log(error)
//     }       
// }


async function getOrders(req, res) {
    // responseCreator(res, 200, "Orden obtenida correctamente");
    try {
        const orders = await Order.find().populate("userId", { fullName: 1, email: 1, surname: 1 }).populate("products.product", { name: 1, description: 1, image: 1 }); //Me busca un id con el que haya guardado en la coleccion de usuarios. Para que me traiga los nombres de mail y email en vez de un id
        // console.log(orders)

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

//----------CHEQUEAR
async function verifyOrderAndCalculate(orderProducts) {
    let total = 0;	
    for (const prod of orderProducts) {
        const product = await Product.findById(prod.product);

        if(!product) throw new Error('Producto no encontrado');

        // check stock
        // if(product.stock < orderProduct.quantity) throw new Error('No hay suficiente stock');
        if(product.price !== prod.price) throw new Error('El precio del producto no coincide');
        total += prod.price * prod.quantity;
    };
    return total;
}

//----------CHEQUEAR
async function updateOrders(req, res) {
    // responseCreator(res, 200, "Orden actualizada correctamente");
    try {
        const id = req.params.id;
        const order = req.body;
        order.totalPrice = await verifyOrderAndCalculate(order.orderProducts);
        const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true });
        if(!updatedOrder) throw new Error('Error al actualizar la orden');
        return res.status(200).send(updatedOrder)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error instanceof Error ? error.message : 'Error al actualizar la orden')
    }
}

//----------CHEQUEAR
async function deleteOrders(req, res) {
    // responseCreator(res, 200, "Orden eliminada correctamente");
    try {
        const id = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if(!deletedOrder) throw new Error('Error al eliminar la orden');
        return res.status(200).send(deletedOrder)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error instanceof Error ? error.message : 'Error al eliminar la orden')
    }
}

async function getUserOrders(req, res){
    const usrId=req.params.id;

    const userOrders = await Order.find({userId: usrId}).populate("userId", { fullName: 1, email: 1, surname: 1 }).populate("products.product", { name: 1, description: 1, image: 1 });

    responseCreator(res, 200, `Ordenes del usuario obtenidas correctamente`, {userOrders})
}

//EXPORTO LOS ENDPOINTS

module.exports = {
    createOrder,
    getOrders,
    getOrdersById,
    updateOrders,
    deleteOrders,
    getUserOrders,
    verifyOrderAndCalculate

}

