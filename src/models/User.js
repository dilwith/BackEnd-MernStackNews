import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    }, 
    usuario: {
        type: String,
        required : true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
     senha: {
        type: String,
        required : true,
        select : false
    },
    avatar: {
      type: String,
      required: false,
    },
    background: {
      type: String,
      required: false,
    },
})
//retirar o cpf depois
/*
 name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
*/
UserSchema.pre("save", async function (next) {
    this.senha = await bcrypt.hash(this.senha , 6)
    next()
})

const User = mongoose.model("User", UserSchema)

export default User;