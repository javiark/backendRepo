const User = require("../schemas/user.schema"); // ../ es a partir de donde nos encontramos

const secret = process.env.JWT_SECRET; //https://jwt.io/

const { 
    responseCreator } 
    = require("../utils/utils") // entre comillas puedo poner varios
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");




async function postUser(req, res) {

    try {
        // console.log(req.body);
        const user = new User(req.body)

        user.role = "CLIENT_ROLE" // eduti desde la base de datos mongocompass los Admin

        //Codificamos el password con una libreria bcrypt

        const passwordHash = await bcrypt.hash(user.password, saltRounds)

        user.password = passwordHash;

        const newUser = await user.save() // el metodo save es asincrono, es algo que tengo que esperar
        // console.log(user)


        return res.send({
            msg: "Usuario creado correctamente",
            user: newUser
        });

    } catch (error) {
        console.log(error)
        return res.status(201).send({
            msg: "Error al crear el usuario",
        })
    }
}


const login = async (req, res) => {
    try {
        console.log(req.body);
        //emil y contraseña
        const emailLogin = req.body.email;
        const passwordLogin = req.body.password;
        //Chequeo que me hayan enviado todos los datos requeridos para el login
        if (!emailLogin || !passwordLogin) {
            return res.status(400).send({
                msg: "Datos del login incompletos"
            })
        }
        //Buscar si existe un usuario con dicho email
        const user = await User.findOne({
            email: emailLogin
        }) // el await espera si encuentra algo. Si encuentra un usuario se guarda todo el objeto user

        if (!user) {
            return res.status(404).send({
                msg: "Datos de ingreso incorrectos"
            }) // siempre que damos una respuesta hay que pone un return y corto la funcion
        }

        //Comprobamos si el usuario obtenido con su propiedad password coincide con el passw del passw que me envia en el login
        const result = await bcrypt.compare(passwordLogin, user.password) // para comprobar si el alfabeta plano es igual al hasheado. passwordLogin - pass plano.  user.password - pass hasheado. El await devuelve una promesa


        if (!result) {

            return responseCreator(res, 404, "Datos Ingresados incorrectos")
        }

        user.password = undefined; // borramos a user la propiedad password para q no me la devuelva en el login

        const token = jwt.sign(user.toJSON(), secret); // puedo ponerle cuando expira. Ver documentacion
        // console.log(token)

        return res.status(200).send({
            msg: "Login correcto",
            user,
            token
        })
        


    } catch (error) {
        console.log(error);
        return res.status(500)("No se pudo realizar el login")
    }

}

async function getUser(req, res) {
    const id = req.params.id
    // console.log(req.user);
    // console.log( req.user._id, req.params.id ); // para verificiar si los id son iguales. Si no es admin role

    if(req.user.role!=="ADMIN_ROLE" && req.user._id!== id){ // sino es admin role y los id no son iguals no los dejo avanzar.Tienen que cumplrirse ambas condiciones y ahi freno
        return responseCreator(res,401,"No puede obtener este usuario")
    }

    // return res.send(`GET USER by ID: ${id}`)

    try {
        const user = await User.findById(id, { password: 0, __v:0 }); // con 0 no devuelve el password, con 1 me trae solo esas propiedades
        // console.log(user)
    
        if (!user) return responseCreator(res, 404, "No se encontro el usuario");
        // user.password=undefined; // como para que no mande el password
        return responseCreator(res, 200, "Usuario encontrado", { user })


    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, "No se pudo obtener el usuario")

    }
}

async function getAllUser(req, res) {
    // return res.send(`GET ALL USERS`)

    try {
        const users = await User.find();

        if (!users) return res.status(404).send({ msg: "No se encontraron usuarios" })

        return responseCreator(res, 200, "Usuarios obtenidos correctamente", { users })
    } catch (error) {
        console.log(error);
        // return res.status(500).send({msg:"No se encontraron usuarios"})
        return responseCreator(res, 500, "Error al obtener usuarios")
    }

}

async function deleteUser(req, res) {
    // return res.send("DELETE USER")
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deleteUser) return responseCreator(res, 404, "No se encontro el usuario");
        // user.password=undefined; // como para que no mande el password
        return responseCreator(res, 200, "Usuario borrado correctamente", { deletedUser })



    } catch (error) {
        console.log(error)
        return responseCreator(res, 500, "No se pudo eliminar el usuario");
    }
}

async function updateUser(req, res) {
    // const id = req.params.id;
    // return res.send("UPDATE USER")
    try {
        const id = req.params.id;
        const data = req.body;
        data.password = undefined;
        // if( data.password){
        //     data.password = await bcrypt.hash(data.password, saltRounds)
        // }
        const updateUser = await User.findByIdAndUpdate(id, data, { new: true })

        if (!updateUser) return responseCreator(res, 404, "No se pudo actualizar")

        return responseCreator(res, 200, "Usuario actualizado correctamente", { updateUser })
    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, "Error al actualizar el usuario")
    }

}

async function updatePassword(req, res) {
    try {
        const id = req.params.id;


        const oldPassword = req.body.oldPassword;
        // console.log(oldPassword)

        let newPassword = req.body.newPassword;

        const user = await User.findById(id);

        if (!user) return responseCreator(res, 404, "No se encontro el usuario.");

        const pwdCompare = await bcrypt.compare(oldPassword, user.password);

        if (!pwdCompare) return responseCreator(res, 401, "No se pudo moficiar la contraseña.");

        newPassword = await bcrypt.hash(newPassword, saltRounds);

        await User.findByIdAndUpdate(id, { passowrd: newPassword });

        return responseCreator(res, 200, "Password actualizado correctamente!")

    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, "No se pudo actualizar el usuario")
    }

}



//como para no repetir todo el tiempo lo mismo creo una funcion


module.exports = {
    postUser,
    getUser,
    getAllUser,
    deleteUser,
    updateUser,
    login,
    updatePassword

}