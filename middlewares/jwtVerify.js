const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const { responseCreator} = require("../utils/utils")


async function jwVerify(req, res, next) {

    try {
        // console.log(req.headers);
        const token=req.headers.authorization;

        const payload = jwt.verify(token, secret);

        // console.log(verify); // devuelve todo lo que contiene el token. Todo los datos del usuario
        req.user = payload; // el payload es el usuario

        // return responseCreator(res, 200, "Token Ok")
        next();

    } catch (error) {
        console.log(error);
        return responseCreator(res, 500,"Error al ingresar token no valido" )
    }


}

module.exports = jwVerify;