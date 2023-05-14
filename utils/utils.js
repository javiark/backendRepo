function responseCreator (res, code, msg, obj){ // el obj devuelve la propiedad, por ejemplo si es usuarios devuelve usuarios
    return res.status(code).send({msg, ...obj }) // con los 3 puntitos lo descomprimo, para que la propiedad sea dinamica
}

function decirHola(){
    console.log("Hola")
}

module.exports={
    responseCreator, //exporto un objeto
    decirHola
}