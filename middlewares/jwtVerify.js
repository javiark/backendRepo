const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
const { responseCreator} = require("../utils/utils")


async function jwVerify(req, res, next) {

    try {
        // console.log(req.headers);
        const token=req.headers.authorization;

        const verify = jwt.verify(token, secret);

        console.log(verify);

        return responseCreator(res, 200, "Token Ok")

    } catch (error) {
        console.log(error);
        return responseCreator(res, 500,"Error al ingresar token no valido" )
    }


}

module.exports = jwVerify;