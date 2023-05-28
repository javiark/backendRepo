//1-a guardo el formulario en una variable
const loginForm = document.getElementById("loginForm");

users = [];
// const { responseCreator } = require("../utils/utils");

const token = localStorage.getItem('token');

const URL = 'http://localhost:4000/api';
const URL_public = 'http://localhost:4000';



//1 - Obtener los datos del formulario
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    // console.dir(loginForm);
    // const { email, password } = loginForm.elements;
    // console.log(loginForm.elements)

    try {
        const dataBody = {
            email: loginForm.elements.email.value,
            password: loginForm.elements.password.value,
        }
        const resp = await axios.post(`${URL}/login`, dataBody)  // envio a login lo que mde devuelve el login Form y el data body
        const { token, user, msg } = resp.data;

        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", JSON.stringify(user))
        swal ({
            title:`Bienvendio ${user.fullName}`,
            icon: 'success',
        })
        // showAlert(`Bienvendio ${user.fullName}`)
        setTimeout(() => {
            window.location.href = "/"
        }, 2000)



    } catch (error) {
        console.log(error)
    }
    return


});




// async function loginUser(evt) {
//     try {
//         evt.preventDefault();
//         console.dir(evt.target);
//         const elements = evt.target.elements;
//         const formFile = new FormData(evt.target);
//         console.dir(formFile);
//         const obj = Object.fromEntries(formFile);
//         console.log(obj);
//         const { data} = await axios.post(`${URL}/login`, obj,{
//             headers: {
//                 Authorization: token
//             }
//         });
//         console.log(data)
//         console.log(data.token)
//         localStorage.setItem("currentUser", JSON.stringify(users));
//         showAlert(`Bienvenido`, "succes" )
//         // setTimeout(()=>{
//         //     window.location.href="/"
//         // }, 2000)



//         // cargarProductos();
//     } catch (error) {
//         showAlert("Login incorrecto", "error" )
//     console.log(error);
//     }
// }








