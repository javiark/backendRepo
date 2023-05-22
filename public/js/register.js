
//1-Obtener formulario y almacenarlo en una variable de JS
    //b-Obtener boton de submit
//2-Vamos a escuchar el evento directamente en JS
    //a-preventDefault
    //b-Tomar los datos y armar el objecto usuario
    //c-Verificar si hay en el localStorage algun usuario guardado ya con ese email
    //d-Verificar que los datos ingresados de password y password2 son exactamente iguales.
    //e-Guardarlo en el localStorage
    //f-Limpiamos el formulario, podemos llevar al usuario a la pagina de Login

    //----------------INICIo--------------
// let users = [];

//1- Obtener formulario y almacenarlo en una variable de JS
const registerForm= document.querySelector("#registerForm");

    //b-Obtener boton de submit
const registerBtn = document.getElementById("registerSubmit");


async function registerUser(evt){
    try{
        evt.preventDefault();
        console.dir(evt.target);
    } catch (error){
    console.log(error);
    return responseCreator(res, 500, "El usuario no se pudo registrar")
    }
}


//2-Vamos a escuchar el evento directamente en JS
registerForm.addEventListener("submit",(event)=>{ // con addEventListener escucho el evento submit
    console.log("Submit event, verfica que no se recargue la pagina");
    console.log(event)
    //a-preventDefault
    event.preventDefault()
    //b-Tomar los datos y armar el objecto usuario
    const el = event.target.elements;
    console.log(el);

    //d-Verificar que los datos ingresados de password y password2 son exactamente iguales.
    if(el.password.value!==el.password2.value){
        console.warn("El password no coincide", "warning");
        alert("El password no coincide")
        return;
    }

//c - Verificar si hay en el localSotarage algun usuario guardado ya con ese email


    //i-Obtener los usuarios guardados en el localStorage

    const users=JSON.parse(localStorage.getItem("users")) || [];

    const userExist = checkIfUserExist(users, el.email.value);

    //existe : retorno y muestro un alert
    if(userExist){
        alert("El email ya existe")
        return;
    }
    
    console.log(users);
    //ii- Recorrer el array con un forEach

   
       //------------------------------------
        //3 versionaes  
        //existe: retorno y muestro un alert
        //no existe : sigo con mi sintaxis normalmente

        console.log("sigue")
    


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
//e-insertar mi array de usuarios el nuevo user(lista de usuarios)
users.push(user)
 //e- Guardarlo en el localStorage
 localStorage.setItem("users", JSON.stringify(users)) //users ahora tiene un usuario mas

 //f- Limpiamos el formulario, o podemos llevar al usuario a la pagina de login
    //a-Resetar el formulario
        //registerForm.reset();



    showAlert("El usuario se registro correctamente", "succes")



    setTimeout(()=>{
    window.location.href = "/index.html"

    },5000) 
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
const avatar=document.getElementById("avatar")
