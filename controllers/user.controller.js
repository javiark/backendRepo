const User = require("../schemas/user.schema"); // ../ es a partir de donde nos encontramos

async function postUser(req,res){

    try{
        // console.log(req.body);
        const user = new User(req.body)
        user.role="CLIENT_ROLE" // eduti desde la base de datos mongocompass los Admin
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





function getUser(req,res){
    const id = req.params.id;
    return res.send(`GET USER by ID: ${id}`)
}

function getAllUser(req,res){
    return res.send(`GET ALL USERS`)
}

function deleteUser(req, res){
    return res.send("DELETE USER")
}

function updateUser(req, res){
    return res.send("UPDATE USER")
}

module.exports={
    postUser,
    getUser,
    getAllUser,
    deleteUser,
    updateUser,
    postUser
}