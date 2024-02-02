import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const loginService = (email) => User.findOne({email: email}).select("+senha")

const generateToken = (id) => jwt.sign({id : id}, process.env.SECRET_JWT , {expiresIn:86400} )    //md5 = chaveDantas remover depois e guardar em .env

export { loginService , generateToken }