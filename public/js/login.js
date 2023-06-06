//1-a guardo el formulario en una variable
const loginForm = document.getElementById("loginForm");

users = [];
// const { responseCreator } = require("../utils/utils");

// const token = localStorage.getItem('token');

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
        console.log(resp.data)

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
        swal ({
            title:`Datos Ingresados incorrectos`,
            icon: 'error',
        })
    }
    return


});












