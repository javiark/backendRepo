const User = require("../schemas/user.schema"); // ../ es a partir de donde nos encontramos
const bcrypt=require("bcrypt");
const saltRounds=10;



async function postUser(req,res){

    try{
        // console.log(req.body);
        const user = new User(req.body)

        user.role="CLIENT_ROLE" // eduti desde la base de datos mongocompass los Admin

        //Codificamos el password con una libreria bcrypt

        const passwordHash=await bcrypt.hash(user.password, saltRounds)

        user.password = passwordHash;

        const newUser = await user.save() // el metodo save es asincrono, es algo que tengo que esperar
        // console.log(user)

        
        
    
        return res.send({
            msg:"Usuario creado correctamente",
            user: newUser
        });

    } catch (error){
        console.log(error)
        return res.status(201).send({
            msg:"Error al crear el usuario",
        })
    }
}


const login = async(req, res)=>{
    try {
            //emil y contraseña
        const emailLogin = req.body.email;
        const passwordLogin = req.body.password;
        //Chequeo que me hayan enviado todos los datos requeridos para el login
        if(!emailLogin || !passwordLogin){
            return res.status(400).send({msg:"Datos del login incompletos"})
        }
        //Buscar si existe un usuario con dicho email
        const user = await User.findOne( { email: emailLogin }) // el await espera si encuentra algo. Si encuentra un usuario se guarda todo el objeto user

        if (!user){
            return res.status(404).send({msg:"Datos de ingreso incorrectos"}) // siempre que damos una respuesta hay que pone un return y corto la funcion
        }

        //Comprobamos si el usuario obtenido con su propiedad password coincide con el passw del passw que me envia en el login
        const result = await bcrypt.compare(passwordLogin, user.password) // para comprobar si el alfabeta plano es igual al hasheado. passwordLogin - pass plano.  user.password - pass hasheado. El await devuelve una promesa

        if(!result){

            return res.status(404).send({msg:"Datos de ingreso incorrectos"})
        }

        user.password=undefined; // borramos a user la propiedad password para q no me la devuelva en el login

        return res.status(200).send({
            msg:"Login correcto",
            user:user,
        })


    } catch (error){
        console.log(error);
        return res.status(500)("No se pudo realizar el login")
    }









}







function getUser(req,res){
    const id = req.params.id;
    return res.send(`GET USER by ID: ${id}`)
}

async function getAllUser(req, res){
    // return res.send(`GET ALL USERS`)

    try{
        const user = await User.find();

        if(!users) return res.status(404).send ({msg:"No se encontraron usuarios"})
    }catch(error){
        console.log(error);
        // return res.status(500).send({msg:"No se encontraron usuarios"})
        return responseCreator(500,"Error al obtener usuarios")
    }

        }




function deleteUser(req, res){
    return res.send("DELETE USER")
}

function updateUser(req, res){
    // const id = req.params.id;
    return res.send("UPDATE USER")
}

//como para no repetir todo el tiempo lo mismo creo una funcion
function responseCreator (code, msg, obj){ // el obj devuelve la propiedad, por ejemplo si es usuarios devuelve usuarios
    return res.status(code).send({msg, [obj]:obj })
}

module.exports={
    postUser,
    getUser,
    getAllUser,
    deleteUser,
    updateUser,
    postUser,
    login
}