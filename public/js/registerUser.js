const URL = 'http://localhost:4000/api';
const URL_public ='http://localhost:4000';
// const { responseCreator } = require("../utils/utils");
const registerForm= document.querySelector("#registerForm");

    //b-Obtener boton de submit
const registerBtn = document.getElementById("registerSubmit");

const token = localStorage.getItem('token');
let users=[]

async function cargarUsuarios() {
    try {
        const token = localStorage.getItem("token"); // no hay que hacer json|pars pq eltoken es una key y una string
        const response = await axios.get(`${URL}/users`, { 
            headers: {
                Authorization: token
            }
        });
        users=response.data.users;
        // console.log(users)
    } catch (error) {
        console.log(error);
       
    }

}
cargarUsuarios()




//2-Vamos a escuchar el evento directamente en JS
registerForm.addEventListener("submit", async (event)=>{ // con addEventListener escucho el evento submit
    try{
    console.log("Submit event, verfica que no se recargue la pagina");
    // console.log(event)
    //a-preventDefault
    event.preventDefault()
    //b-Tomar los datos y armar el objecto usuario
    const el = event.target.elements;
    // console.log(el);

    //d-Verificar que los datos ingresados de password y password2 son exactamente iguales.
    if(el.password.value!==el.password2.value){
        console.warn("El password no coincide", "warning");
        swal ({
            title:"Los datos ingresados son incorrectos",
            icon: 'error',
        })  
        
        return;
    }

    const userExist = checkIfUserExist(users, el.email.value);

    if(userExist){
        swal ({
            title:"El email ya existe",
            icon: 'error',
        })  
        return;
    }
    

    const user = {
        fullName:el.fullName.value,
        surname:el.surname.value,
        email: el.email.value,
        password: el.password.value,
        age: el.age.value,
        bornDate: el.bornDate.value,
        country:el.country.value,
        gender: el.gender.value,
        role:"USER_ROLE",
    }
    const response = await axios.post(`${URL}/users`,user);  
    Users = response.data.user; 

 //f- Limpiamos el formulario, o podemos llevar al usuario a la pagina de login
    //a-Resetar el formulario
        //registerForm.reset();

    swal ({
        title:"El usuario se registro correctamente",
        icon: 'success',
    })  

    setTimeout(() => {
        window.location.href = "/"
    }, 3500)
} catch (error) {
    console.log(error)
}

})



function checkIfUserExist(users, emailToSearch){
    // const el = event.target.elements;


    // *============Solucion 3
       const indexOfUser = users.findIndex(usuario =>{
        if(usuario.email === emailToSearch){
            //solamente trabaja dentro del findIndex
            return true
        }
       })

       if(indexOfUser >=0){  // la posicion 0 se considera falso
        console.warn("El usuario ya existe findeIndex");

        //!retorno de mi funcion
        return true;
       }
       return false;
      
       //------------------------------------
        //3 versionaes  
        //existe: retorno y muestro un alert
        //no existe : sigo con mi sintaxis normalmente
        console.log("sigue")

}


// async function postUser(evt){
//     try{
//         evt.preventDefault();
//         // console.dir(evt.target);
//         const elements = evt.target.elements;
//         if (elements.password.value !== elements.password2.value) {
//             swal ({
//                 title:"Los datos ingresados son incorrectos",
//                 icon: 'error',
//             })  
//     }

//         // console.log(elements.stock.checked);
//         console.dir(elements.name);
//         // console.dir(elements.price)
//         const formFile = new FormData(evt.target);

//         // TODO: remover Observar que tengo
//         const obj = Object.fromEntries(formFile);
//         console.log(obj.password);

//         // la envio a axios en el metodo post
//         const { data} = await axios.post(`${URL}/users`, obj);
        
//         console.log(data)
//         // cargarProductos();
//         console.log("se registro");
//         swal ({
//             title:"El usuario se registro correctamente",
//             icon: 'success',
//         })  

//     } catch (error){
//     console.log(error);
//     }
// }


// async function registerUser(evt){
//     try{
//         evt.preventDefault();
//         console.dir(evt.target);
//     } catch (error){
//     console.log(error);
//     return responseCreator(res, 500, "El usuario no se pudo registrar")
//     }
// }
