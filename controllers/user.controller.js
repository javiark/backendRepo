function postUser(req,res){
    return res.send("POST USER")
}

function getUser(req,res){
    const id = req.params.id;
    return res.send(`GET USER by ID: ${id}`)
}

function getAllUser(req,res){
    return res.send(`GET ALL USERS`)
}

module.exports={
    postUser,
    getUser,
    getAllUser
}