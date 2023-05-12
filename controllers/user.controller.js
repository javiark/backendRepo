const User = require("../schema/user.schema"); // ../ es a partir de donde nos encontramos

function postUser(req,res){
    console.log(req.body);

    return res.send("POST USER")
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
    updateUser
}