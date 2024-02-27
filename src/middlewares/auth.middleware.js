import dotenv from "dotenv"
import userService from "../services/user.service.js"
import jwt from "jsonwebtoken"

dotenv.config()
export const authMiddleware = (req,res,next) => {
    //Bearer serve como um autenficiador de 2 etapas, para o JWT token em uma seção de usuario, utilizado para VERIFICAR 
    try{
        const { authorization } = req.headers
        //console.log("Debug auth.middleware authorization 1: " , authorization)
        //Bearer and JWT 
        
    if(!authorization) {
        return res.send(401)
    }

    const parts = authorization.split(" ")
    //console.log("Debug auth.middleware authorization 2(parts): " , parts)
 
    if(parts.length !== 2){
        return res.send(401)
    }// Bearer JWT --> 2 campos por isso !== 2 - Bearer - JWT

    const [schema , token] = parts
    //console.log("Debug auth.middleware authorization 3(schema , token): " ,schema , token)
    //schema - Bearer
    //token - JWT 

    if(schema !== "Bearer") {
        return res.send(401)
    }
    //validação do token JWT
    jwt.verify(token , process.env.SECRET_JWT , async (error , decoded) => { 
        if(error){
            return res.status(401).send({message: "Token invalid!"})
        }
        const user = await userService.findByIdService(decoded.id)

        if(!user || !user.id){
            return res.status(401).send({message: "Token invalid!"})
        }
    
        req.userId = user._id

        return next()
    })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
    
    
}
