const URL = 'http://localhost:5000/api';
const URL_public ='http://localhost:5000';
const { responseCreator } = require("../utils/utils");
const token = localStorage.getItem('token');
// let users=[]

// async function cargarUsuarios() {
//     try {
//         const respuesta = await axios.get(`${URL}/users`);
//         // Products = data.products;
//         console.log(respuesta.data.usuarios)
//         users=respuesta.data.usuarios
//         // renderizarTabla(products)
//     } catch (error) {
//         console.log(error);

//     }

// }

// cargarUsuarios()

async function postUser(evt){
    try{
        evt.preventDefault();
        // console.dir(evt.target);
        const elements = evt.target.elements;

        // console.log(elements.stock.checked);
        console.dir(elements.name);
        // console.dir(elements.price)
        const formFile = new FormData(evt.target);

        // TODO: remover Observar que tengo
        const obj = Object.fromEntries(formFile);
        console.log(obj.password);

        // la envio a axios en el metodo post
        const { data} = await axios.post(`${URL}/users`, obj);
        
        console.log(data)
        // cargarProductos();
        console.log("se registro");

    } catch (error){
    console.log(error);
    }
}





module.exports = {
    postUser

}