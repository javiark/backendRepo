
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

//1- Obtener formulario y almacenarlo en una variable de JS
const registerForm= document.querySelector("#registerForm");

    //b-Obtener boton de submit
const registerBtn = document.getElementById("registerSubmit");


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
// console.log(avatar)
// function avatar{}



/*function showAlert(text, type){
    //*VAMOS A HACER NUESTRO ALERT
    const alertDialog = document.createElement("div");
    //crea un elemento HTML node
    alertDialog.classList.add("alert-dialog");
    //Añade una clase

    if(type ==="error"){
        alertDialog.style.backgroundColor="red";
    }
    if(type ==="warning"){
        alertDialog.style.backgroundColor="orange";
    }

    // alertDialog.innerText=text;
    
    // alertDialog.innerText = "Se agrego el usuario correctamente!";

    // document.querySelector("body").appendChild(alertDialog)
// para demorar su aparicion luego de aberlo creado lineas anterior con documento createElemnt
    setTimeout(()=>
    alertDialog.classList.add("show"),10)

    setTimeout(()=>{
        // alertDialog.remove();
        alertDialog.classList.remove("show")
        setTimeout(()=>
        alertDialog.remove())
        // window.location.href="/page/login/login.html"
    },3000) // a los tres segundos se le agrega la clase hidden y se oculta
}*/


//Funciones con parametros nombrados
/*
function customFont({color, size, weight}){
    const divTexto = document.createElement("p");
    divTexto.innerText="Un texto a modificar";

    divTexto.style.color = color ? color:"blue"; //le aplico por defecto un azul sino viene el color
    divTexto.style.fontSize = size || "16px"; // otra forma de hacerlo
    divTexto.style.fontWeight = weight ? weight:500;

    document.body.appendChild(divTexto)

}


//!--------------3 OPCIONES DE FILTRAR PARA NO REPETIR EL EMAIL-------------------------
 //*============Solucion1
    // users.forEach(usr => {

    //     if(usr.email === el.email.value){
    //         console.warn("el usuario ya existe");
    //         userEmailExist=true;
    //         return;
    //         console.warn("1")
    //         console.warn("1")
    //         console.warn("1")
    //         console.warn("1")
    //         // userEmailExist = true;
    //     }
    //     // console.log("ForEach : Fuera del if")
    // })
    // if(userEmailExist){
    //     console.warn("El usuario ya existe");
    //     return
    // }

        // *============Solucion 2
        // const userExist=users.find(user=>{
        

        //     if(user.mail === el.email.value){
        //         return true;
        //     }
        //     return false  //no es necesario ya que sino lo defino se hace un returna undefined (es falso)
        // })
    
        // if(userExist){
        //     showAlert("El email ya se encuentr registrado", "error")
        //     return;
        // }

            // // *============Solucion 3
            // const indexOfUser = users.findIndex(usuario =>{
            //     if(usuario.email===el.email.value){
            //         return true
            //     }
            //    })
        
            //    if(indexOfUser >=0){  // la posicion 0 se considera falso
            //     console.warn("El usuario ya existe findeIndex");
            //     return;
            //    }
              

*/
