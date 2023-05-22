//1-a guardo el formulario en una variable
const loginForm=document.getElementById("loginForm");
users=[];
// const { responseCreator } = require("../utils/utils");

const token = localStorage.getItem('token');

const URL = 'http://localhost:5000/api';
const URL_public ='http://localhost:5000';



async function login(evt){
    try {
    return res.send(`DELETE USER`);
    } catch (error) {
    console.log(error);
     return responseCreator(res, 500, "no se creo el usuario" )
    }
}

module.exports = {
    login

}




    // async function login(req, res) {
    //     try {
    //         //Recibir datos del usuario que intenta loguearse (body)
    //         const emailBody = req.body.email;
    //         const passwordBody = req.body.password;
    //         console.log(passwordBody)
    //         //Buscar si existe un usuario con ese email
    //         const user = await User.findOne({email: emailBody })
    //         //El usuario no existe devuelvo que no se encontro usuario
    //         if(!user) {
    //             return res.status(404).send(`Login incorrecto alguno de los datos es incorrecto`)
    //         }
    
    //         //Existe usuario comparo el password  que me envió en el login con el que tiene mi usuario en la DB
    //         const result = await bcrypt.compare(passwordBody, user.password);
    
    //         // La persona se logueo correctamente
    //         if(!result) {
    //             return res.status(404).send({
    //                 msg: 'Login incorrecto alguno de los datos es incorrecto',
    //                 ok: false
    //             })   
    //         }
    //         //Remuevo el password del user
    //         user.password = undefined
    //         // Como la persona es quien dice ser, necesito generar un JWT
    //         const token = await jwt.sign(user.toJSON(), secret, { expiresIn: '2h'});
    
    //         return res.status(200).send({
    //             msg: 'Login correcto',
    //             ok: true,
    //             token,
    //             user
    //         })
    
    
    //     } catch (error) {
    //         console.log(error);
    //         res.status(400).send({
    //             msg: `Error al intentar loguearse`,
    //             ok: false
    //         })
    //     }
    
        
    
    // }

// //1 - Obtener los datos del formulario
// loginForm.addEventListener("submit",(event)=>{
//     event.preventDefault();
//     console.dir(loginForm)
//     // con la destructuracoin genero dos variables, email y password
//     //const el= loginForm.elements;
//     const { email,password} = loginForm.elements;

//     console.log(email.value, password.value)
//     //2- Checkear datos ingresdos con los usuarios que tengo
//     //2a-Obtener los usuarios almacenados
//     const users=JSON.parse(localStorage.getItem("users")) || []; // las comillas verticales son por si no encuentra nada, toma un array vacio y no va a ser null. Un array vacio es null
//     console.log(users)
//     const elements1 = users.elements;
//     console.dir(elements1)
//     // const elements1 = elements.value;
//     // console.dir(elements1.age)

//     const user = users.find((usr)=>{
//         if (usr.email ===email.value){
//             return true;        
//         }
//         return false;
//     }) //objeto { name, password, email}

//     if(!user){ //sino existe usuario
//         alert("Los datos ingresados son incorrectos");
//         return;
//     }

//     if(user.password ===password.value){
//         localStorage.setItem("currentUser", JSON.stringify(user));
//         // document.getElementById("loginLogo").classList.add('loginColor')
//         showAlert(`Bienvenido ${user.fullName} `, "succes" )
//         // alert(`Bienvenido ${user.fullName} `)


//         setTimeout(()=>{
//             window.location.href="/index.html"
//         }, 2000)
//         // const loginUser= document.getElementById("loginName")

//         // // console.log(`${user.fullName}`)
//         // loginUser.innerHTML = `${user.fullName}`

//         // console.log(user.fullName)
//     } 
//     else {
//         showAlert("Login incorrecto", "error" )
//         return;}
//     });

//     function cleanOrder(){
//         sessionStorage.clear("order");
//     }






